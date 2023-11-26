import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types'
import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from '@tanstack/react-query'
import {
	createPost,
	createUserAccount,
	deleteSavedPost,
	getCurrentUser,
	getRecentPosts,
	getUserById,
	getUsers,
	likePost,
	savePost,
	signInAccount,
	signOutAccount,
	updateUser,
	getInfinitePosts,
	getPostById,
	getUserPosts,
	updatePost,
	deletePost,
	searchPosts,
} from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'

/** auth queries methods */
export const useCreateUserAccountMutation = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	})
}

export const useSignInAccountMutation = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signInAccount(user),
	})
}

export const useSignOutAccountMutation = () => {
	return useMutation({
		mutationFn: signOutAccount,
	})
}

/** post query methods */
export const useCreatePostMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (post: INewPost) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			}) //
		},
	})
}

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	})
}

export const useGetPosts = () =>
	useInfiniteQuery({
		queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
		queryFn: getInfinitePosts,
		getNextPageParam: (lastPage: any) => {
			if (lastPage && lastPage.documents.length === 0) {
				return null
			}
			const lastId = lastPage?.documents[lastPage.documents.length - 1].$id
			return lastId
		},
		initialPageParam: 0,
	})

export const useSearchPosts = (searchTerm: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
		queryFn: () => searchPosts(searchTerm),
		enabled: !!searchTerm,
	})
}

/** like and save */
export const useLikePost = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({
			postId,
			likesArray,
		}: {
			postId: string
			likesArray: string[]
		}) => likePost(postId, likesArray),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			})
		},
	})
}

export const useSavePost = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
			savePost(userId, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			})
		},
	})
}

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			})
		},
	})
}

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	})
}

export const useGetUsers = (limit?: number) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS],
		queryFn: () => getUsers(limit),
	})
}

export const useGetUserById = (userId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (user: IUpdateUser) => updateUser(user),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
			})
		},
	})
}

/** get post  */
export const useGetPostById = (postId?: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
		queryFn: () => getPostById(postId),
		enabled: !!postId,
	})
}

export const useGetUserPosts = (userId?: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
		queryFn: () => getUserPosts(userId),
		enabled: !!userId,
	})
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (post: IUpdatePost) => updatePost(post),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			})
		},
	})
}

export const useDeletePost = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
			deletePost(postId, imageId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			})
		},
	})
}
