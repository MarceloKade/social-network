'use client'
import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

type User = {
    id: number;
    likes: number;
    userName: string;
    posts: Post[];
    comments: Comment[];
};

type Post = {
    id: number;
    likes: number;
    title: string;
    content: string;
    comments: Comment[];
};

type Comment = {
    id: number;
    likes: number;
    content: string;
};

type GlobalContextProps = {
    children: React.ReactNode;
};

interface ContextProps {
    userId: number,
    setUserId: Dispatch<SetStateAction<number>>,
    user: User[],
    setUser: Dispatch<SetStateAction<User[]>>,
    post: Post[],
    setPost: Dispatch<SetStateAction<Post[]>>,
    comment: Comment[],
    setComment: Dispatch<SetStateAction<Comment[]>>,
}

const GlobalContext = createContext<ContextProps>({
    userId: 0,
    setUserId: (): number => 0,
    user: [],
    setUser: (): User[] => [],
    post: [],
    setPost: (): Post[] => [],
    comment: [],
    setComment: (): Comment[] => [],
});

export const GlobalContextProvider: React.FC<GlobalContextProps> = ({ children }) => {
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState<[] | User[]>([]);
    const [post, setPost] = useState<[] | Post[]>([]);
    const [comment, setComment] = useState<[] | Comment[]>([]);

    return (
        <GlobalContext.Provider value={{
            userId,
            setUserId,
            user,
            setUser,
            post,
            setPost,
            comment,
            setComment
        }}>
            {children}
        </GlobalContext.Provider >
    )
};

export const UserGlobalContext = () => useContext(GlobalContext); 