'use client'
import React, { createContext, useContext, useState } from 'react';

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

type ContextProps = {
    userId: number;
    setUserId: (id: number) => void;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    isFocused: boolean;
    setIsFocused: (isFocused: boolean) => void;
    users: User[];
    setUsers: (users: User[]) => void;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    comments: Comment[]; // Correção aqui
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>; // Correção aqui
    contents: string[];
    setContents: (contents: string[]) => void;
    newPostContent: string;
    setNewPostContent: (content: string) => void;
    newCommentContent: string;
    setNewCommentContent: (content: string) => void;
};

const GlobalContext = createContext<ContextProps | undefined>(undefined);

export const GlobalContextProvider: React.FC<GlobalContextProps> = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [userId, setUserId] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [contents, setContents] = useState<string[]>([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');

    const contextValue: ContextProps = {
        userId,
        setUserId,
        isOpen,
        setOpen,
        isFocused,
        setIsFocused,
        users,
        setUsers,
        posts,
        setPosts,
        comments,
        setComments,
        contents,
        setContents,
        newPostContent,
        setNewPostContent,
        newCommentContent,
        setNewCommentContent,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): ContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
};
