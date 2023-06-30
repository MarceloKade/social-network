'use client'
import React, { createContext, useContext, useState } from 'react';

type Like = {
    id: number;
    userId: number;
    postId: number;
    commentId: number;
};

type User = {
    id: number;
    userName: string;
    likes: Like[];
    posts: Post[];
    comments: Comment[];
};

type Post = {
    id: number;
    userId: number;
    content: string;
    likes: Like[];
    comments: Comment[];
};

type Comment = {
    id: number;
    userId: number;
    likes: Like[];
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
    showInput: boolean;
    setShowInput: (isFocused: boolean) => void;
    isFocused: boolean;
    setIsFocused: (isFocused: boolean) => void;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    contents: string[];
    setContents: (contents: string[]) => void;
    newUserName: string;
    setNewUserName: (userName: string) => void;
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
    const [newUserName, setNewUserName] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);


    const contextValue: ContextProps = {
        userId,
        setUserId,
        isOpen,
        setOpen,
        isFocused,
        setIsFocused,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        posts,
        setPosts,
        comments,
        setComments,
        contents,
        setContents,
        newUserName,
        setNewUserName,
        newPostContent,
        setNewPostContent,
        newCommentContent,
        setNewCommentContent,
        showInput,
        setShowInput
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