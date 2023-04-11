import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				time: Date.now(),
			},
			'hello',
			{ expiresIn: '8h' }
		);

    res.setHeader('Set-Cookie', cookie.serialize('JIM_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 3600,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }))
    res.json(user);
	} else {
    res.status(401).json({ error: 'Email or Password is wrong'});
  }
}
