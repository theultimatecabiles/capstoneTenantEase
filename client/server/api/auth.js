import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
const REGISTER_SECRET_KEY = process.env.REGISTER_SECRET_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Configure multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDirProfilePic = path.join(process.cwd(), 'public', 'images', 'profilePictures');
      const uploadDirDocument = path.join(process.cwd(), 'public', 'images', 'documentPictures');

      // Create directories if they don't exist
      if (!fs.existsSync(uploadDirProfilePic)) {
        fs.mkdirSync(uploadDirProfilePic, { recursive: true });
      }
      if (!fs.existsSync(uploadDirDocument)) {
        fs.mkdirSync(uploadDirDocument, { recursive: true });
      }

      // Set destination based on file field name
      if (file.fieldname === 'profilePic') {
        cb(null, uploadDirProfilePic);
      } else if (file.fieldname === 'document') {
        cb(null, uploadDirDocument);
      } else {
        cb(new Error('Invalid file field name'));
      }
    },
    filename: (req, file, cb) => {
      const sanitizedFilename = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
      cb(null, sanitizedFilename);
    }
  })
});

// Create Nodemailer transporter for sending verification emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Click the link to verify your email: ${verificationUrl}`,
  };

  return transporter.sendMail(mailOptions);
};

export default defineEventHandler(async (event) => {
  const { method } = event.req;

  if (method === 'POST') {
    return new Promise((resolve, reject) => {
      upload.any()(event.req, event.res, async (err) => {
        if (err) return reject({ message: err.message });

        try {
          const body = event.req.body;
          const files = event.req.files || [];

          // LOGIN action
          if (body.action === 'login') {
            const user = await prisma.user.findUnique({ where: { email: body.email } });
            if (!user || !await bcrypt.compare(body.password, user.password)) {
              throw new Error('Invalid email or password');
            }

            if (!user.verified) {
              throw new Error('Email is not verified');
            }

            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
            return resolve({ token, userId: user.userId, roleId: user.roleId });
          }

          // REGISTER action
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
            const document = files.find(file => file.fieldname === 'document');
            const documentUrl = document ? `/images/documentPictures/${document.filename}` : null;

            if (!['1', '2','3'].includes(body.roleId)) {
              throw new Error('Invalid role');
            }

            // Create the user but don't verify yet
            const user = await prisma.user.create({ 
              data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                phone: body.phone,
                profilePic: profilePicUrl,
                document: documentUrl,  // Save the document URL
                roleId: parseInt(body.roleId),
                verified: false, // Mark the user as not verified
              },
            });

            const role = await prisma.role.findUnique({
              where: { roleId: parseInt(body.roleId) }
            });

            const admin = await prisma.user.findFirst({
              where: { roleId: 3 } // Assuming roleId 3 is for admin
            });

            if (admin) {
              // Create a notification for the admin
              await prisma.adminNotification.create({
                data: {
                  adminId: admin.userId,
                  content: `New ${role.roleName} registered: ${body.name}`,
                  type: 'USER_REGISTRATION',
                },
              });
            } else {
              console.warn('No admin user found to notify about the new registration.');
            }

            // Generate email verification token
            const emailVerificationToken = jwt.sign({ userId: user.userId }, REGISTER_SECRET_KEY, { expiresIn: '1h' });

            // Save the token to the database
            await prisma.user.update({
              where: { userId: user.userId },
              data: { verificationToken: emailVerificationToken }, // Set verification token
            });

            // Send the verification email
            await sendVerificationEmail(user.email, emailVerificationToken);

            return resolve({ message: 'Registration successful. Please check your email to verify your account.' });
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
