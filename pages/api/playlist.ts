import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

export default validateRoute(
	async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id
      }
    })
    res.json(playlists)
  }
);
