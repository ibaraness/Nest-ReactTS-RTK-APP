import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectAllUsers } from './usersSlice';
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store';


interface UsersUIState {
    selectedUserId: number | null;
    pageNum: number;
    rowsPerPage: number;
    searchTerm: string;
}

const initialState: UsersUIState = {
    selectedUserId: null,
    pageNum: 0,
    rowsPerPage: 5,
    searchTerm: ''
}

// Creating a state slice for the user UI. Apart from fetching and storing the user list, 
// there are other states we need like UI states that we like to store here instead of using 
// the useState hook of the component
export const usersUISlice = createSlice({
    name: 'usersUI',
    initialState,
    reducers: {
        setSelectedUserId: (state, action: PayloadAction<number | null>) => {
            state.selectedUserId = action.payload
        },
        setPageNum: (state, action: PayloadAction<number>) => {
            state.pageNum = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        }
    }
});

// Export relevant selectors for users UI
export const selectPageNum = (state: RootState) => state.usersUI.pageNum;
export const selectRowsPerPage = (state: RootState) => state.usersUI.rowsPerPage;
export const selectSelectedUserId = (state: RootState) => state.usersUI.selectedUserId;
export const selectUsersSearchTerm = (state: RootState) => state.usersUI.searchTerm;

export const selectSearchResult = createSelector(
    [selectAllUsers,
        (state: RootState) => state.usersUI.searchTerm],
    (users, term) => {
        return term ? users.filter(user =>
            user.name.toLowerCase().search(term.toLowerCase()) === 0)
            : users
    }
)

// Create a cached selector that returns a list of visible users objects (for the MUI table), 
export const selectVisibleRows = createSelector(
    [selectSearchResult,
        selectPageNum,
        selectRowsPerPage],
    (users, pageNum, rowsPerPage) => {
        const userCount = users.length;
        const startingIndex = pageNum * rowsPerPage;
        const start = startingIndex >= userCount ? userCount - 1 : startingIndex;
        const end = (start + rowsPerPage) >= userCount ? userCount : start + rowsPerPage;
        return users.slice(start, end)
    }
);

// Export relevant actions for users UI
export const { setRowsPerPage, setSelectedUserId, setPageNum, setSearchTerm } = usersUISlice.actions;

// Export usersUI reducer to the store
export default usersUISlice.reducer;  