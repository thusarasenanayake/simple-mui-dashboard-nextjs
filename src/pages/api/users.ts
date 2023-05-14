import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function index(_: NextApiRequest, res: NextApiResponse) {
    // await new Promise(() => setTimeout(console.log, 5000));
    const users = await prisma.user.findMany();
    return res.status(200).json({
        users,
    });
}
