const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export type Comment = {
    postId: number;
    id: number;
    email: string;
    body: string;
};

export type Post = {
    postId: number;
    title: string;
    comments: Comment[];
};

export type UserComment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export type UserPost = {
    postId: number;
    id: number;
    title: string;
    body: string;
};

export async function getPosts(userId: number | string): Promise<Post[]> {
    const userPosts: UserPost[] = (await fetch(`${POST_URL}?userId=${userId}`, {
        method: "GET",
    }).then((userPost) => userPost.json())) as UserPost[];

    const postsContainsUserComment: Post[] = [];

    for (const userPost of userPosts) {
        const userComments: UserComment[] = (await fetch(
            `${POST_URL}/${userPost.id}/comments`,
            { method: "GET" }
        ).then((userComment) => userComment.json())) as UserComment[];

        const comments: Comment[] = [];

        for (const userComment of userComments) {
            comments.push({
                postId: userComment.postId,
                id: userComment.id,
                email: userComment.email,
                body: userComment.body,
            });
        }

        const post: Post = {
            postId: userPost.id,
            title: userPost.title,
            comments: comments,
        };

        postsContainsUserComment.push(post);
    }

    return postsContainsUserComment;
}
