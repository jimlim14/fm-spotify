import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateRoute = (handler: Function) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const { JIM_ACCESS_TOKEN: token } = req.cookies; // const token = req.cookies.JIM_ACCESS_TOKEN;

		if (token) {
			let user;

			try {
				const { id } = jwt.verify(token, 'hello');
				user = await prisma.user.findUnique({
					where: { id },
				});

				if (!user) {
					throw new Error('Not real user');
				}
			} catch (error) {
				res.status(401).json({ erorr: 'Not Authorized' });
				return;
			}

			return handler(req, res, user);
		}

		res.status(401).json({ error: 'Not Authorized' });
	};
};

export const validateToken = (token: string) => {
	const user = jwt.verify(token, 'hello');
	return user;
}
