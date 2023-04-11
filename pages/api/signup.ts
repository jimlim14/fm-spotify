import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import prisma from '../../lib/prisma';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email, 
        password: bcrypt.hashSync(password, salt),
        firstName: 'Jim',
        lastName: 'Lim'
      }
    })
  } catch (e) {
    res.status(401).json({error: 'User already exists'})
    return;
  }

  const token = jwt.sign({
    email: user.email,
    id: user.id,
    time: Date.now()
  }, 'hello', {expiresIn: '8h'})

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('JIM_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 3600,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
  )

  res.json(user);
}
