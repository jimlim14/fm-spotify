import { createStore, action } from 'easy-peasy';

export const store = createStore({
	activeSongs: [],
	activeSong: null,
	changeActiveSongs: action((state: any, payload) => {
		state.activeSongs = payload;
	}),
	changeActiveSong: action((state: any, payload) => {
		state.activeSong = payload;
	}),
});

// import { createSlice } from '@reduxjs/toolkit';

// export const store = createSlice({
// 	name: 'song',
// 	initialState: {
// 		activeSongs: [],
// 		activeSong: null,
// 	},
// 	reducers: {
// 		changeActiveSongs: (state, action) => {
// 			state.activeSongs = action.payload;
// 		},
// 		changeActiveSong: (state, action) => {
// 			state.activeSong = action.payload;
// 		}
// 	}
// })