"use client";
import { useState } from "react";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
export default function Home() {
    const [search, setSearch] = useState("");

    function handleSearch(): void {
        const baseUrl = process.env.BASE_URL;
        const apiKey = process.env.API_KEY;
        const url = `${baseUrl}search?part=snippet&q=${search}&key=${apiKey}`;
        axios
            .get(url)
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    }

    function handleSearchChange(e: React.FormEvent<HTMLInputElement>): void {
        setSearch(e.currentTarget.value);
    }

    return (
        <>
            <div className="flex place-content-center place-items-center gap-2 mt-10">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => handleSearchChange(e)}
                    className="bg-[#E5E3D4] text-slate-800 w-[30vw] h-[40px] rounded-lg p-4 text-xl tracking-wider placeholder:text-slate-500 focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="bg-[#89A8B2] text-black hover:bg-[#B3C8CF] h-[40px] hover:text-slate-800 px-6 rounded-lg"
                >
                    Search
                </button>
            </div>
            <section className=""></section>
        </>
    );
}
