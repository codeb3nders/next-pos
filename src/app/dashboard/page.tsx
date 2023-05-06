"use client"
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Provider from "@/app/Provider/page";

import { verifyToken } from "@/utils/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token", token);
    
    if (!token) {
   //   router.push("/login");
    }
    const decodedToken = verifyToken(token!);
    console.log({decodedToken});
    // if (!decodedToken) {
    //   router.push("/login");
    //   return;
    // }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Provider>
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-medium mb-4">Welcome to the dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      </Provider>
    </div>
  );
}
