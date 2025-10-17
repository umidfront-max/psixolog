"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Specialist {
	specialist_id: number;
	name: string;
	photo: string;
	base_price: number;
	short_description: string;
}

export default function PsychologistCard() {
	const router = useRouter();
	const [specialists, setSpecialists] = useState<Specialist[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchSpecialists() {
			try {
				const res = await fetch("https://xn--80agomhibes5b3a.xn--p1ai/specialist/");
				if (!res.ok) throw new Error("API xatosi");
				const data = await res.json();
				setSpecialists(data);
			} catch (err) {
				console.error("Xato:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchSpecialists();
	}, []);

	if (loading) {
		return (
			<div className="container text-center text-lg py-10 text-gray-600">
				Yuklanmoqda...
			</div>
		);
	}

	return (
		<div className="!space-y-4 container !my-6">
			{specialists.map((p) => {
				const imgUrl = p.photo.startsWith("http")
					? p.photo
					: `https://xn--80agomhibes5b3a.xn--p1ai/${p.photo.replace(/\\/g, "/")}`;

				return (
					<div
						key={p.specialist_id}
						className="bg-[#F4F4F440] rounded-3xl p-10 max-xl:!px-5 grid max-md:grid-cols-1 max-xl:grid-cols-3 grid-cols-4 gap-20 max-lg:gap-10 max-sm:gap-4 max-md:gap-x-0 max-md:!py-6"
					>
						{/* Chap qism */}
						<div className="flex flex-col items-start">
							<div className="w-full rounded-xl mb-4">
								<Image
									src={imgUrl}
									alt={p.name}
									width={160}
									height={160}
									className="object-cover rounded-3xl h-60 max-md:h-96 w-full"
								/>
							</div>

							<button
								onClick={() => router.push(`/calendar?id=${p.specialist_id}`)}
								className="bg-primary w-full text-center text-white px-4 py-2 rounded-full text-sm font-medium mb-3"
							>
								ЗАПИСАТЬСЯ НА ПРИЕМ
							</button>

							<p className="text-gray-700 text-xl max-sm:text-base !mb-4">
								{p.short_description || "Психолог"}
							</p>
							<p className="text-gray-500 border-t border-gray-300 !pt-4 max-md:w-full">
								Ближайшее время:{" "}
								<span className="text-primary-dark">Сегодня, 19:00</span>
							</p>
						</div>

						{/* O‘ng qism */}
						<div className="col-span-3 max-xl:col-span-2 flex flex-col justify-between">
							<div>
								<h2 className="text-2xl max-sm:hidden font-medium text-gray-800 mb-2">
									{p.name}
								</h2>

								{/* Teglar (hozircha statik, keyinchalik API’dan qo‘shish mumkin) */}
								<div className="flex max-sm:hidden flex-wrap gap-2 mb-3">
									<span className="px-3 py-1 border bg-primary/20 border-sky-400 text-sky-500 rounded-full text-xs">
										Психолог
									</span>
									<span className="px-3 py-1 border bg-primary/20 border-sky-400 text-sky-500 rounded-full text-xs">
										Нейропсихолог
									</span>
								</div>

								{/* Tajriba (hozircha statik) */}
								<div className="flex items-center gap-2 text-sm mb-3">
									<img src="/portfel.svg" alt="" />
									<span className="font-medium text-sm">15 лет практики</span>
								</div>

								{/* Video-vizitka */}
								<button className="px-4 py-2 border border-primary-dark text-primary-dark flex gap-2 rounded-full text-sm mb-3 hover:bg-sky-50">
									<img src="/paly.svg" alt="" />
									<span className="text-sm">Посмотреть видео-визитку</span>
								</button>

								{/* Narx */}
								<p className="text-2xl font-bold max-sm:font-semibold !my-4">
									{p.base_price} ₽{" "}
									<span className="text-sm text-gray-500 font-normal max-sm:text-xs !mb-1">
										Индивидуальная консультация ~60 мин.
									</span>
								</p>

								{/* Tavsif (hozircha qisqa info) */}
								<p className="text-gray-700 text-xl max-sm:text-base leading-normal !mb-2">
									{p.short_description || "Сертифицированный психолог."}
								</p>
							</div>

							<button
								onClick={() => router.push(`/psixolog?id=${p.specialist_id}`)}
								className="bg-primary text-white px-12 py-2 rounded-full text-sm max-sm:w-full font-medium mt-4 self-start"
							>
								ПОДРОБНЕЕ
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}
