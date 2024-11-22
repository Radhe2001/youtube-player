'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
type Video = {
	kind: string;
	etag: string;
	videoId: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	channelTitle: string;
	publishTime: string;
};
export default function Home() {
	const [search, setSearch] = useState('');
	const [results, setResults] = useState<Video[]>([]);

	function handleSearch(): void {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
		const apiKey = process.env.NEXT_PUBLIC_API_KEY;
		const url = `${baseUrl}search?part=snippet&q=${search}&key=${apiKey}`;
		axios
			.get(url)
			.then((response) => {
				const data = response.data.items;
				const newResults = data.map((e: any) => ({
					kind: e.kind,
					etag: e.etag,
					videoId: e.id.videoId,
					title: e.snippet.title,
					description: e.snippet.description,
					thumbnailUrl: e.snippet.thumbnails.medium.url,
					channelTitle: e.snippet.channelTitle,
					publishTime: e.snippet.publishTime,
				}));
				setResults(() => [...newResults]);
			})
			.catch((error) => console.error('Error fetching data:', error));
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
		if (e.key === 'Enter') handleSearch();
	}

	return (
		<>
			<div className="flex place-content-center place-items-center gap-2 my-8">
				<input
					type="text"
					placeholder="Search..."
					id="search"
					name="search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={handleKeyDown}
					className="bg-[#E5E3D4] text-slate-800 w-[30vw] h-[40px] rounded-lg p-4 text-xl tracking-wider placeholder:text-slate-500 focus:outline-none"
				/>
				<button
					onClick={handleSearch}
					className="bg-[#89A8B2] text-black hover:bg-[#B3C8CF] h-[40px] hover:text-slate-800 px-6 rounded-lg"
				>
					Search
				</button>
			</div>
			<section className="flex place-content-center">
				<section className="w-[60%]">
					{results ? (
						<ul>
							{results.map((item: Video, index: number) => (
								<div className="flex mb-6 gap-[5%]" key={index}>
									<Image
										src={item.thumbnailUrl}
										alt={item.title}
										width={400}
										height={300}
										layout="fixed"
										className="rounded-lg w-[35%] cursor-pointer"
									/>
									<div className="w-[60%]">
										<h3 className="text-xl text-[#78B3CE] ">
											{item.title}
										</h3>
										<h3 className="text-2xl text-[#D8DBBD]">
											{item.channelTitle}
										</h3>
										<h3 className="text-xl text-[#CB9DF0]">
											{item.description}
										</h3>
										<h3 className="text-xl">
											{item.publishTime}
										</h3>
									</div>
								</div>
							))}
						</ul>
					) : (
						<div className="w-[100%] h-[100%] flex place-content-center place-items-center">
							<p className="text-white">No results yet.</p>
						</div>
					)}
				</section>
			</section>
		</>
	);
}
