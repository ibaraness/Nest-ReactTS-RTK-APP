import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store';

interface NewPostUIState {
    title: string;
    body: string;
    isSnackOpen: boolean;
}

const initialState: NewPostUIState = {
    title: '',
    body: '',
    isSnackOpen: false
}

// Creating a state slice for create post UI form, in which we created controlled inputs (title and body),
// and we also show a snackbar on successful post creation 
export const newPostUISlice = createSlice({
    name: 'newPost',
    initialState,
    reducers: {
        setPostTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setPostBody: (state, action: PayloadAction<string>) => {
            state.body = action.payload;
        },
        setIsSnackOpen: (state, action: PayloadAction<boolean>) => {
            state.isSnackOpen = action.payload;
        }
    }
});

export const selectPostTitle = (state: RootState) => state.newPostUI.title;
export const selectPostBody = (state: RootState) => state.newPostUI.body;
export const selectIsSnackOpen = (state: RootState) => state.newPostUI.isSnackOpen;

export const { setPostBody, setPostTitle, setIsSnackOpen } = newPostUISlice.actions;

export default newPostUISlice.reducer;