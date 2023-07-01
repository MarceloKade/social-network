'use client'
import Post from "@/components/Post";
import User from "@/components/User";

export default function Home() {

  return (
    <div className="bg-slate-200 min-h-screen text-slate-50 flex flex-col">
      <h1 className="font-title font-bold text-xl ml-4 mt-4 mb-2 text-socialFont">CardoNet</h1>
      <div>
        <User />
        <div className="h-auto pt-10 flex justify-center">
          <Post />
        </div>
      </div>
    </div>
  );
}