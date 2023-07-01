'use client'
import { useEffect, useRef } from "react";
import { User, useGlobalContext } from "@/app/hooks/Context/useGlobalContext";
import Button from "./Button";

export default function User() {
    const { userId, users, setUsers, selectedUser, setSelectedUser, newUserName, setNewUserName, showInput, setShowInput } = useGlobalContext();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setUsers((prevUsers) =>
            prevUsers.map((prevUser, index) => ({
                ...prevUser,
                id: userId + index,
            }))
        );
    }, [userId, setUsers]);

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    const handleCreateUser = () => {
        if (newUserName.trim() !== "") {
            const isDuplicate = users.some((user) => user.userName === newUserName);

            if (isDuplicate) {
                alert("User with the same name already exists!");
            } else {
                const newUser = {
                    id: userId + users.length,
                    likes: [],
                    posts: [],
                    comments: [],
                    userName: newUserName,
                };

                setUsers((prevUsers) => [...prevUsers, newUser]);
                setNewUserName("");
                setShowInput(false);
            }
        }
    };

    const handleUserClick = (user: User | null) => {
        setSelectedUser(user);
    };

    return (
        <div className="fixed flex flex-col gap-1 border-2 rounded-xl ml-2 w-80 h-[800px] p-2 text-userFont bg-userBackground">
            {showInput ? (
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleCreateUser();
                            }
                        }}
                        className="block rounded-xl pl-3 py-1 outline-none w-full"
                        placeholder="Enter user name"
                    />
                </div>
            ) : (
                <Button
                    title="Create User"
                    className="bg-buttonBackground px-4 py-2 text-white rounded-xl"
                    onClick={() => setShowInput(true)}
                />
            )}
            {users.map((user) => (
                <div key={user.id} className={`flex items-center rounded-2xl gap-2 cursor-pointer ${user === selectedUser ? 'bg-gray-300' : ''}`} onClick={() => handleUserClick(user)}>
                    <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full">
                        <p className="text-sm">{user.userName.charAt(0)}</p>
                        <p className="text-sm">{user.userName.charAt(Math.floor(user.userName.length / 2))}</p>
                        <p className="text-sm">{user.userName.charAt(user.userName.length - 1)}</p>
                    </div>

                    <p className="font-nameUser text-lg">{user.userName}</p>
                </div>
            ))}
        </div>
    );
}