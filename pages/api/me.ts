import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../lib/auth';
import prisma from '../../lib/prisma';

interface User {
	id: number;
	email: string;
	password: string;
}

export default validateRoute(
	async (req: NextApiRequest, res: NextApiResponse, user: User) => {
		const playlistsCount = await prisma.playlist.count({
			where: {
				userId: user.id,
			},
		});
		console.log(playlistsCount);
		res.json({ ...user, playlistsCount });
	}
);
