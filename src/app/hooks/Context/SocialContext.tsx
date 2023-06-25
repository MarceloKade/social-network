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
    userId: number;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setUserId: Dispatch<SetStateAction<number>>;
    user: User[];
    setUser: Dispatch<SetStateAction<User[]>>;
    post: Post[];
    setPost: Dispatch<SetStateAction<Post[]>>;
    comment: Comment[];
    setComment: Dispatch<SetStateAction<Comment[]>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
    userId: 0,
    setUserId: (): void => { },
    user: [],
    setUser: (): void => { },
    post: [],
    setPost: (): void => { },
    comment: [],
    setComment: (): void => { },
    open: false,
    setOpen: (): void => { },
    content: "",
    setContent: (): void => { },
});

export const GlobalContextProvider: React.FC<GlobalContextProps> = ({ children }) => {
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState<[] | User[]>([]);
    const [post, setPost] = useState<[] | Post[]>([]);
    const [comment, setComment] = useState<[] | Comment[]>([]);
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                userId,
                setUserId,
                user,
                setUser,
                post,
                setPost,
                comment,
                setComment,
                open,
                setOpen,
                content,
                setContent,
            }}
        >
            {children}
        </GlobalContext.Provider >
    )
};

export const UserGlobalContext = () => useContext(GlobalContext); 