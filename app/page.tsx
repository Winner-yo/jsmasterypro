"use client";
import React, { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <h1 className="h1-bold">Welcome to Next.js 👋</h1>
      <h1 className="h1-bold font-space-grotesk">Welcome to Next.js 👋</h1>
      {/* <h1 className="">Welcome to Next.js 👋</h1> */}
      <input
        type="text"
        placeholder="Searching..."
        value={searchTerm}
        className="w-full p-2 mb-4 border-b-2 border-gray-300 focus:outline-none"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </>
  );
};
export default Home;
