import useSWR from 'swr';
import fetcher from './fetcher';

import { Playlist } from '@prisma/client';

export const useMe = () => {
	const { data, error } = useSWR('/me', fetcher);

	return {
		user: data,
		isLoading: !data && !error,
		isError: error,
	};
};

export const usePlaylist = () => {
	const { data, error } = useSWR('/playlist', fetcher);
 
	return {
		playlists: (data as any) || [], //so that error wont pop when mapping through empting data
		isLoading: !data && !error,
		isError: error,
	};
};
