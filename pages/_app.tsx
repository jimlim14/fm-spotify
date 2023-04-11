import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import playerLayout from '../components/playerLayout';
import 'reset-css';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import { store } from '../lib/store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NextPageContext } from 'next';

interface Component extends NextPageContext {
	authPage: boolean
}

const theme = extendTheme({
	colors: {
		gray: {
			100: '#F5F5F5',
			200: '#EEEEEE',
			300: '#E0E0E0',
			400: '#BDBDBD',
			500: '#9E9E9E',
			600: '#757575',
			700: '#616161',
			800: '#424242',
			900: '#212121',
		},
	},
	components: {
		Button: {
			variants: {
				link: {
					':focus': {
						outline: 'none',
						bodShadow: 'none',
					},
				},
			},
		},
	},
});

// const store = configureStore()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<StoreProvider store={store}>
				{Component.authPage ? (
					<Component {...pageProps} />
				) : (
					<playerLayout>
						<Component {...pageProps} />
					</playerLayout>
				)}
			</StoreProvider>
		</ChakraProvider>
	);
}

export default MyApp;
