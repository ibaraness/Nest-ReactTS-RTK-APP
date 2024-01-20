import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { RootState } from '../../store/store';

export interface User {
    id: number;
    name: string;
    email: string;
    companyName: string;
}

// Creating an entity adapter to normalize the user lists into
// object based collection with the users IDs as keys
const usersAdapter = createEntityAdapter<User>();

// Generate initial state object with 'ids' and 'entities' for future entries 
const initialState = usersAdapter.getInitialState();

// Extending API for user slice to handle user state related actions here
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<EntityState<User, number>, undefined>({
            query: () => "/users",
            transformResponse: (responseData: User[]) => {
                // Storing the list of users to an entity adapter
                return usersAdapter.setAll(initialState, responseData);
            },
        })
    })
});

// Export the auto-generated hook for the `getUsers` query endpoint
export const { useGetUsersQuery } = usersApiSlice;


export const selectUsersResult = usersApiSlice.endpoints.getUsers.select(undefined);

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

// Export all user list related selectors
export const { selectAll: selectAllUsers, selectById: selectUserById } =
    usersAdapter.getSelectors((state:RootState) => selectUsersData(state) ?? initialState);