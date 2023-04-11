import type { NextPage } from 'next';
import prisma from '../lib/prisma';
import GradientLayout from '../components/gradientLayout';
import { Artist } from '@prisma/client';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useMe } from '../lib/hooks';

const Home: NextPage<Artist[]> = ({ artists }) => {
  const { user } = useMe();

	return (
		<GradientLayout
			image='https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=1940&userId=&cache=v2'
			roundImage={true}
			color='purple'
			subtitle='profile'
			title={`${user?.firstName} ${user?.lastName}`}
			description={`${user?.playlistsCount} public playlists`}
		>
			<Box color='white' paddingX='40px'>
				<Box marginBottom='40px'>
					<Text fontSize='2xl' fontWeight='bold'>
						Top artist this month
					</Text>
					<Text fontSize='md'>Only visible to you</Text>
				</Box>
				<Flex>
					{artists.map((artist: Artist) => (
						<Box key={artist.id} paddingX='10px' width='20%'>
							<Box bg='gray.900' borderRadius='4px' padding='15px' width='100%'>
								<Image
									src='https://placekitten.com/300/300'
									borderRadius='100%'
									alt=''
								/>
								<Box marginTop='20px'>
									<Text fontSize='large'>{artist.name}</Text>
									<Text fontSize='x-small'>Artist</Text>
								</Box>
							</Box>
						</Box>
					))}
				</Flex>
			</Box>
		</GradientLayout>
	);
};

export const getServerSideProps = async () => {
	const artists = await prisma.artist.findMany({});
	console.log(artists);
	return {
		props: {
			artists: JSON.parse(JSON.stringify(artists)),
		},
	};
};

export default Home;
