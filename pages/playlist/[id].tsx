import { JwtPayload } from 'jsonwebtoken';
import { NextPage } from 'next';
import GradientLayout from '../../components/gradientLayout';
import SongTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';

const getBGColor = (id: number) => {
	const colors = [
		'red',
		'green',
		'blue',
		'orange',
		'purple',
		'gray',
		'teal',
		'yellow',
	];

	return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist: NextPage<any> = ({ playlist }) => {
	const color = getBGColor(playlist.id);
	return (
		<GradientLayout
			color={color}
			roundImage={false}
			title={playlist.name}
			subtitle='playlist'
			description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
		>
      <SongTable songs={playlist.songs} />
    </GradientLayout>
	);
};

export const getServerSideProps = async ({ query, req }: any) => {
  let user;

  try {
    user = validateToken(req.cookies.JIM_ACCESS_TOKEN);
  } catch(e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      }
    }
  }
	const [playlist] = await prisma.playlist.findMany({
		where: {
			id: +query.id, //query.id = playlist.id
			userId: user.id 
		},
		include: {
			songs: {
				include: {
					artist: {
						select: {
							name: true,
							id: true,
						},
					},
				},
			},
		},
	});

	return {
		props: {
			playlist: JSON.parse(JSON.stringify(playlist)),
		},
	};
};

export default Playlist;
