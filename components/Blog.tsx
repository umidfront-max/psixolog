// app/page.tsx yoki pages/index.tsx

import Image from "next/image";

export default function Blog() {
	const posts = [
		{
			id: 1,
			category: "Телевидение",
			title: "НА ТЕЛЕШОУ В 2022 ГОДУ",
			image: "/image.png",
		},
		{
			id: 2,
			category: "Радио",
			title: "ЭФИРЫ НА РАДИО В 2021 ГОДУ",
			image: "/img2.png",
		},
		{
			id: 3,
			category: "Телевидение",
			title: "НАУЧНО-ПОПУЛЯРНЫЙ ФИЛЬМ «ДЕТИ-ЗВЕРИ» С УЧАСТИЕМ ПС...",
			image: "/img3.png",
		},
		{
			id: 4,
			category: "СМИ",
			title: "ПОЧЕМУ РЕБЕНОК ВЕРИТ В ДЕДА МОРОЗА — ОБЪЯСНЯЕТ ПСИХО...",
			image: "/img4.png",
		},
		{
			id: 5,
			category: "Телевидение",
			title: "УЧАСТВУЮ В РАЗЛИЧНЫХ ПЕРЕДАЧАХ НА РАЗНЫХ ТЕЛЕКАНАЛАХ",
			image: "/img5.png",
			large: true,
		},
	];

	return (
		<main className="container !py-10 !mt-10">
			{/* Title */}
			<h1 className="max-md:text-2xl max-sm:text-xl text-4xl font-medium mb-8 max-md:mb-5">
				БЛОГ С НАТАЛЬЕЙ НАУМОВОЙ
			</h1>

			{/* Grid */}
			<div className="grid md:grid-cols-11 gap-6">
				{/* left column (2 + 2 small) */}
				<div className="col-span-6 grid grid-cols-2 gap-6 max-sm:gap-4 max-[380px]:grid-cols-1">
					{posts
						.filter((p) => !p.large)
						.map((post) => (
							<div
								key={post.id}
								className="rounded-[22px]  overflow-hidden border border-gray-300 bg-white"
							>
								<div className="relative w-full h-44">
									<Image
										src={post.image}
										alt={post.title}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-4">
									<p className="text-sm text-gray-500 bg-fuchsia-50 px-2 py-0.5 rounded-xl w-fit">
										{post.category}
									</p>
									<h2 className="text-base font-medium mt-2 mb-6 line-clamp-2">
										{post.title}
									</h2>
									<button className="mt-3 text-primary tracking-[0.15px] text-sm font-medium uppercase">
										Подробнее →
									</button>
								</div>
							</div>
						))}
				</div>

				{/* right column (large card) */}
				<div className="col-span-5 max-md:hidden">
					{posts
						.filter((p) => p.large)
						.map((post) => (
							<div
								key={post.id}
								className="rounded-[22px] overflow-hidden border border-gray-300 bg-white h-full flex flex-col"
							>
								<div className="relative w-full h-132">
									<Image
										src={post.image}
										alt={post.title}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-5 px-12 flex flex-col flex-grow">
									<p className="text-sm text-gray-500">
										{post.category}
									</p>
									<h2 className="text-base font-medium mt-1 flex-grow">
										{post.title}
									</h2>
									<button className="mt-3 text-start text-primary tracking-[0.15px] text-sm font-medium uppercase">
										Подробнее →
									</button>
								</div>
							</div>
						))}
				</div>
			</div>

			{/* All posts button */}
			<div className=" mt-10">
				<button className="px-36 py-3 max-sm:w-full max-sm:px-3 font-medium  rounded-full hover:text-white transition  bg-primary hover:bg-primary-dark">
					ВСЕ ЗАПИСИ
				</button>
			</div>
		</main>
	);
}
