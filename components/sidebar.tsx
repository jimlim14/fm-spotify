import { Playlist } from '@prisma/client';
import { NextPage } from 'next';
import NextLink from 'next/link';
import NextImage from 'next/image';
import {
	Box,
	List,
	ListItem,
	ListIcon,
	Divider,
	Center,
	LinkBox,
	LinkOverlay,
} from '@chakra-ui/layout';
import {
	MdHome,
	MdSearch,
	MdLibraryMusic,
	MdPlaylistAdd,
	MdFavorite,
} from 'react-icons/md';

import { IconType } from 'react-icons'; // needed for typescript interface

import { usePlaylist } from '../lib/hooks';

interface NavMenu {
	name: string;
	icon: IconType;
	route: string;
}

interface MusicMenu {
	name: string;
	icon: IconType;
	route: string;
}

const navMenu: NavMenu[] = [
	{
		name: 'Home',
		icon: MdHome,
		route: '/',
	},
	{
		name: 'Search',
		icon: MdSearch,
		route: '/search',
	},
	{
		name: 'Your Library',
		icon: MdLibraryMusic,
		route: '/library',
	},
];

const musicMenu: MusicMenu[] = [
	{
		name: 'Create Playlist',
		icon: MdPlaylistAdd,
		route: '/',
	},
	{
		name: 'Favourites',
		icon: MdFavorite,
		route: '/favorites',
	},
];

const Sidebar: NextPage = () => {
	const { playlists } = usePlaylist();
	return (
		<Box
			width='100%'
			height='calc(100vh - 100px)'
			bg='black'
			paddingX='5px'
			color='gray'
		>
			<Box paddingY='20px' height='100%'>
				<Box width='120px' marginBottom='20px' paddingX='20px'>
					<NextImage src='/logo.svg' height={60} width={120} />
				</Box>

				<Box marginBottom='20px'>
					<List spacing={2}>
						{navMenu.map((menu: NavMenu) => (
							<ListItem paddingX='20px' fontSize='16px' key={menu.name}>
								<LinkBox>
									<NextLink href={menu.route} passHref>
										<LinkOverlay>
											<ListIcon
												as={menu.icon}
												color='white'
												marginRight='20px'
											/>
											{menu.name}
										</LinkOverlay>
									</NextLink>
								</LinkBox>
							</ListItem>
						))}
					</List>
				</Box>

				<Box marginY='20px'>
					<List spacing={2}>
						{musicMenu.map((menu: MusicMenu) => (
							<ListItem paddingX='20px' fontSize='16px' key={menu.name}>
								<LinkBox>
									<NextLink href={menu.route} passHref>
										<LinkOverlay>
											<ListIcon
												as={menu.icon}
												color='white'
												marginRight='20px'
											/>
											{menu.name}
										</LinkOverlay>
									</NextLink>
								</LinkBox>
							</ListItem>
						))}
					</List>
				</Box>

				<Divider color='gray.800' />

				<Box height='66%' overflowY='auto' paddingY='20px'>
					<List spacing={2}>
						{playlists.map((playlist: Playlist) => (
							<ListItem paddingX='20px' key={playlist.id}>
								<LinkBox>
									<NextLink
										href={{
											pathname: '/playlist/[id]',
											query: { id: playlist.id },
										}}
										passHref
									>
										<LinkOverlay>{playlist.name}</LinkOverlay>
									</NextLink>
								</LinkBox>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
