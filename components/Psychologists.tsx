// components/Psychologists.tsx
import Image from "next/image";

const psychologists = [
	{
		name: "НАТАЛЬЯ НАУМОВА",
		role: "Психолог, детский нейропсихолог",
		price: "8 000",
		img: "/u1.png",
	},
	{
		name: "МАРИЯ КОНОВАЛОВА",
		role: "Детский психолог, детский нейропсихолог",
		price: "4 000",
		img: "/u2.png",
	},
	{
		name: "ВАЛЕРИЯ РОДЕНКОВА",
		role: "Психолог, арт-терапевт",
		price: "4 000",
		img: "/u3.png",
	},
];

export default function Psychologists() {
	return (
		<section className="py-12 bg-white">
			<div className="container">
				<h2 className="text-4xl font-medium  mb-6">
					НАШИ ПСИХОЛОГИ
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{psychologists.map((p, i) => (
						<div className="rounded-2xl flex flex-col">
							<div className="w-full h-90 mb-4 overflow-hidden rounded-xl">
								<Image
									src={p.img}
									alt={p.name}
									width={360}
									height={360}
									className="object-cover w-full h-full"
								/>
							</div>
							{/* Bu joyda h-max emas, balki flex-1 ishlat */}
							<div className="flex flex-col flex-1">
								<div className="flex-1">
									<h3 className="text-primary-dark font-medium text-2xl">
										{p.name}
									</h3>
									<p className="text-gray-700 min-h-10 mt-1 mb-2 text-xl">
										{p.role}
									</p>

									<a
										href="#"
										className="text-primary-dark inline-block hover:no-underline my-6 mt-5"
									>
										ПОДРОБНЕЕ...
									</a>
									<div className="border-t border-gray-200 pt-4 px-6">
										<div className="font-medium text-lg">
											<span className="border-r inline-block pr-6 border-gray-200">
												Прием психолога{" "}
											</span>
											<span className="text-primary-dark pl-6 font-medium text-3xl">
												{p.price}{" "}
												<span className="text-sm">руб.</span>
											</span>
										</div>
									</div>
								</div>

								<button className="w-full mt-3 bg-primary hover:bg-primary-dark hover:text-white font-medium py-2 px-6 rounded-full transition">
									ЗАПИСАТЬСЯ
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
