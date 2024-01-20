import { apiSlice } from '../api/apiSlice';

export interface Post {
    id: number,
    userId: number;
    title: string;
    body: string;
}

interface CreatePost {
    userId: number;
    title: string;
    body: string;
}

// Extending API for post slice to handle user state related actions here
export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserPosts: builder.query<Post[], number>({
            query: userId => `/posts/${userId}`,
            providesTags: ['Post']
        }),
        addNewPost: builder.mutation<Post, CreatePost>({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        })
    })
})

// Export the auto-generated hook query and mutation endpoint
export const { useGetUserPostsQuery, useAddNewPostMutation } = postsApiSlice;


