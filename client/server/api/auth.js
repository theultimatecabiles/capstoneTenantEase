import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

// Configure multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'profilePictures');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Sanitize filename to avoid security risks
      const sanitizedFilename = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
      cb(null, sanitizedFilename);
    }
  })
});

export default defineEventHandler(async (event) => {
  const { method } = event.req;

  if (method === 'POST') {
    // Set up multer to handle file uploads
    return new Promise((resolve, reject) => {
      upload.any()(event.req, event.res, async (err) => {
        if (err) return reject({ message: err.message });

        try {
          const body = event.req.body;
          const files = event.req.files || [];

          if (body.action === 'login') {
            const user = await prisma.user.findUnique({ where: { email: body.email } });
            if (!user || !await bcrypt.compare(body.password, user.password)) {
              throw new Error('Invalid email or password');
            }
          
            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
            return resolve({ token, userId: user.userId, roleId: user.roleId }); // Include roleId in the response
          }

          if (body.action === 'register') {
            if (body.password !== body.confirmPassword) {
              throw new Error('Passwords do not match');
            }

            const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
            if (existingUser) {
              throw new Error('Email already exists');
            }

            const hashedPassword = await bcrypt.hash(body.password, 10);
            const profilePic = files.find(file => file.fieldname === 'profilePic');
            const profilePicUrl = profilePic ? `/images/profilePictures/${profilePic.filename}` : null;

            if (!['1', '2'].includes(body.roleId)) {
              throw new Error('Invalid role');
            }

            const user = await prisma.user.create({
              data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                profilePic: profilePicUrl,
                roleId: parseInt(body.roleId), // Ensure roleId is an integer
              },
            });

            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
            return resolve({ token, userId: user.userId });
          }

          throw new Error('Invalid action');
        } catch (error) {
          return reject({ message: error.message });
        }
      });
    });
  }

  throw new Error('Invalid method');
});
