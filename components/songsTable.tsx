import { Box } from '@chakra-ui/layout';
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { NextPage } from 'next';
import { Song } from '@prisma/client';
import { formatDate, formatTime } from '../lib/fomatters';
import { useStoreActions } from 'easy-peasy';

interface Props {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  url: string;
  duration: number;
  artistId: number;
}

const SongTable: NextPage<any> = ({ songs }) => {
	const playSongs = useStoreActions((store) => store.changeActiveSongs);
	const setActiveSong = useStoreActions((store) => store.changeActiveSong);

	function handlePlay(activeSong?: Song) {
		playSongs(songs);
		setActiveSong(activeSong || songs[0]);
	}

	return (
		<Box bg='transparent' color='white'>
			<Box padding='10px' marginBottom='20px'>
				<Box marginBottom='30px'>
					<IconButton
						icon={<BsFillPlayFill fontSize='30px' />}
						aria-label='play'
						colorScheme='green'
						size='lg'
						isRound
            onClick={() => handlePlay()}
					/>
				</Box>
				<Table variant='unstyled'>
					<Thead borderBottom='1px solid' borderColor='rgba(255,255,255,0.2)'>
						<Tr>
							<Th>#</Th>
							<Th>Title</Th>
							<Th>Date Added</Th>
							<Th>
								<AiOutlineClockCircle />
							</Th>
						</Tr>
					</Thead>

					<Tbody>
						{songs.map((song: Song, i: number) => (
							<Tr
								key={song.id}
								sx={{
									transition: 'all .3s',
									'&:hover': {
										bg: 'rgba(255,255,255, 0.1)',
									},
								}}
								cursor='pointer'
                onClick={() => handlePlay(song)}
							>
								<Td>{i + 1}</Td>
								<Td>{song.name}</Td>
								<Td>{formatDate(song.createdAt)}</Td>
								<Td>{formatTime(song.duration)}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default SongTable;
