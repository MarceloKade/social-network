'use client'
import { useRef, useState } from "react";
import { useGlobalContext } from "@/app/hooks/Context/useGlobalContext";
import Button from "./Button";
import Modal from "./Modal";

export default function Post() {
    const {
        posts,
        setPosts,
        isOpen,
        setOpen,
        newPostContent,
        setNewPostContent,
        comments,
        setComments,
        newCommentContent,
        setNewCommentContent,
        selectedUser,
        setSelectedUser,
    } = useGlobalContext();
    const [likedPosts, setLikedPosts] = useState<{ [postId: number]: boolean }>(
        {}
    );
    const [activeCommentPostId, setActiveCommentPostId] = useState<
        number | null
    >(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCreatePost = () => {
        const newPost = {
            id: posts.length + 1,
            content: newPostContent,
            likes: [],
            comments: [],
            userId: selectedUser?.id,
        };

        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setNewPostContent("");
        setOpen(false);
    };

    const handleCreateComment = () => {
        if (activeCommentPostId !== null && newCommentContent !== "") {
            const newComment = {
                id: comments.length + 1,
                content: newCommentContent,
                userId: selectedUser?.id,
            };

            setComments((prevComments) => [...prevComments, newComment]);

            setPosts((prevPosts) =>
                prevPosts.map((prevPost) => {
                    if (prevPost.id === activeCommentPostId) {
                        return {
                            ...prevPost,
                            comments: [...prevPost.comments, newComment],
                        };
                    }
                    return prevPost;
                })
            );

            setActiveCommentPostId(null);
            setNewCommentContent("");
        }
    };

    const handleToggleCommentInput = (postId: number) => {
        if (activeCommentPostId === postId) {
            setActiveCommentPostId(null);
            return;
        }

        setActiveCommentPostId(postId);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleLike = (postId: number) => {
        if (!likedPosts[postId]) {
            setPosts((prevPosts) =>
                prevPosts.map((prevPost) => {
                    if (prevPost.id === postId) {
                        const updatedLikes = [...prevPost.likes, selectedUser?.id];
                        return { ...prevPost, likes: updatedLikes };
                    }
                    return prevPost;
                })
            );
        } else {
            setPosts((prevPosts) =>
                prevPosts.map((prevPost) => {
                    if (prevPost.id === postId) {
                        const updatedLikes = prevPost.likes.filter(
                            (userId) => userId !== selectedUser?.id
                        );
                        return { ...prevPost, likes: updatedLikes };
                    }
                    return prevPost;
                })
            );
        }

        setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [postId]: !prevLikedPosts[postId],
        }));
    };

    return (
        <div className="flex flex-col gap-1 w-96">
            <Button
                className="p-2 bg-buttonBackground"
                title="Create Post"
                onClick={() => {
                    if (selectedUser) {
                        setOpen(true);
                    } else {
                        alert("Please select a user before creating a post.")
                    }
                }}
            />
            {posts.map((post) => (
                <div className="mb-2 rounded-xl p-4 bg-postBackground text-postContentFont" key={post.id}>
                    <div className="flex gap-1 items-center">
                        <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full">
                            <p className="text-xs">{selectedUser?.userName?.charAt(0) ?? ""}</p>
                            <p className="text-xs">{selectedUser?.userName?.charAt(Math.floor(selectedUser.userName.length / 2)) ?? ""}</p>
                            <p className="text-xs">{selectedUser?.userName?.slice(-1) ?? ""}</p>
                        </div>
                        <p>{selectedUser?.userName}</p>
                    </div>
                    <p className="font-content text-sm mb-2">{post.content}</p>
                    {post.likes.length < 1 ? (
                        <span className="hidden" />
                    ) : (
                        <span className="flex items-center mb-2 text-xs gap-1">
                            <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full">
                                <p className="text-xs">{selectedUser?.userName?.charAt(0) ?? ""}</p>
                                <p className="text-xs">{selectedUser?.userName?.charAt(Math.floor(selectedUser.userName.length / 2)) ?? ""}</p>
                                <p className="text-xs">{selectedUser?.userName?.slice(-1) ?? ""}</p>
                            </div>
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="red"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 20.4l-1.44-1.3C5.56 15.17 2 12.25 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.75-3.56 6.67-8.56 10.6L12 20.4z" />
                            </svg>
                            <p>{post.likes.length}</p>
                        </span>
                    )}
                    <div className="flex gap-2">
                        <button onClick={() => handleLike(post.id)}>
                            <span className="flex mb-2 text-sm gap-1 items-end">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={likedPosts[post.id] ? "red" : "black"}
                                    width="24"
                                    height="24"
                                >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 20.4l-1.44-1.3C5.56 15.17 2 12.25 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.75-3.56 6.67-8.56 10.6L12 20.4z" />
                                </svg>
                                <p>Like</p>
                            </span>
                        </button>
                        <button onClick={() => handleToggleCommentInput(post.id)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                data-supported-dps="24x24"
                                fill="currentColor"
                                width="24"
                                height="24"
                                focusable="false"
                            >
                                <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z" />
                            </svg>
                        </button>
                        <Button
                            title="Comment"
                            className="text-sm  text-postContentFont"
                            onClick={() => handleToggleCommentInput(post.id)}
                        />
                    </div>
                    {activeCommentPostId === post.id && (
                        <div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={newCommentContent}
                                onChange={(e) => setNewCommentContent(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleCreateComment();
                                    }
                                }}
                                className="block rounded-xl pl-3 py-1 outline-none w-full"
                                placeholder="Enter your comment"
                                autoFocus
                            />
                        </div>
                    )}
                    <div className="font-content text-">
                        {post.comments.map((comment) => (
                            <div key={comment.id}>
                                <div className="flex gap-1 items-center">
                                    <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full">
                                        <p className="text-xs">{selectedUser?.userName?.charAt(0) ?? ""}</p>
                                        <p className="text-xs">{selectedUser?.userName?.charAt(Math.floor(selectedUser.userName.length / 2)) ?? ""}</p>
                                        <p className="text-xs">{selectedUser?.userName?.slice(-1) ?? ""}</p>
                                    </div>
                                    <p>{selectedUser?.userName}</p>

                                </div>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Modal
                isOpen={isOpen}
                setOpen={setOpen}
                onSubmit={handleCreatePost}
                onContentChange={setNewPostContent}
                content={newPostContent}
            />
        </div>
    );
}