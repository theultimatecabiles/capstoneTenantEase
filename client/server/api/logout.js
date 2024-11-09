import { PrismaClient } from '@prisma/client';
import { eventHandler } from 'h3';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    try {
      const body = await event.request.json();

      if (body.token) {
        // Add the token to the blacklist
        await prisma.blacklistedToken.create({
          data: {
            token: body.token,
          },
        });
      }


      return {
        statusCode: 200,
        body: { message: 'Logged out successfully' }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      };
    }
  } else {
    return {
      statusCode: 405,
      body: { error: `Method ${event.node.req.method} Not Allowed` }
    };
  }
});