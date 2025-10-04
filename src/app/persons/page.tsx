// components/PsychologistCard.tsx
import Image from "next/image";

const psychologists = [
	{
		id: 1,
		name: "НАТАЛЬЯ НАУМОВА",
		image: "/bn.png",
		role: "Психолог, детский нейропсихолог",
		nextTime: "Сегодня, 19:00",
		tags: ["Психолог", "Детский нейропсихолог"],
		experience: "15 лет практики",
		price: "8 000 ₽",
		consultation: "Индивидуальная консультация ~60 мин.",
		descriptions: [
			"Сертифицированный специалист факультета психологии МГУ им Ломоносова с опытом работы более 15 лет, с детьми, взрослыми и семьями.",
			'Действительный член <a href="https://psy-org.ru/" target="_blank" class="text-primary-dark underline hover:text-sky-600">Национальной саморегулируемой организации «Союз психотерапевтов и психологов»</a>',
			"Психолог-эксперт, участница теле- и радиоэфиров, автор более 150 научных и научно-популярных статей о психологии.",
		],
	},
	{
		id: 2,
		name: "Наталья Наумова",
		image: "/u2.png",
		role: "Психолог, детский нейропсихолог",
		nextTime: "Сегодня, 19:00",
		tags: ["Психолог", "Детский нейропсихолог"],
		experience: "15 лет практики",
		price: "4 000 ₽",
		consultation: "Индивидуальная консультация ~60 мин.",
		descriptions: [
			"Сертифицированный специалист факультета психологии МГУ им Ломоносова с опытом работы более 15 лет, с детьми, взрослыми и семьями.",
			'Действительный член <a href="https://psy-org.ru/" target="_blank" class="text-primary-dark underline hover:text-sky-600">Национальной саморегулируемой организации «Союз психотерапевтов и психологов»</a>',
			"Психолог-эксперт, участница теле- и радиоэфиров, автор более 150 научных и научно-популярных статей о психологии.",
		],
   },
   {
		id: 2,
		name: "Наталья Наумова",
		image: "/u3.png",
		role: "Психолог, детский нейропсихолог",
		nextTime: "Сегодня, 19:00",
		tags: ["Психолог", "Детский нейропсихолог"],
		experience: "15 лет практики",
		price: "4 000 ₽",
		consultation: "Индивидуальная консультация ~60 мин.",
		descriptions: [
			"Сертифицированный специалист факультета психологии МГУ им Ломоносова с опытом работы более 15 лет, с детьми, взрослыми и семьями.",
			'Действительный член <a href="https://psy-org.ru/" target="_blank" class="text-primary-dark underline hover:text-sky-600">Национальной саморегулируемой организации «Союз психотерапевтов и психологов»</a>',
			"Психолог-эксперт, участница теле- и радиоэфиров, автор более 150 научных и научно-популярных статей о психологии.",
		],
	},
];

export default function PsychologistCard() {
	return (
		<div className="!space-y-10">
			{psychologists.map((p) => (
				<div
					key={p.id}
					className="container bg-[#F4F4F440] rounded-2xl !p-16 grid max-md:grid-cols-1 grid-cols-4 gap-20"
				>
					{/* Chap qism */}
					<div className="flex flex-col items-center md:items-start">
						<div className="w-full rounded-xl mb-4">
							<Image
								src={p.image}
								alt={p.name}
								width={160}
								height={160}
								className="object-cover rounded-3xl h-60 w-full"
							/>
						</div>
						<button className="bg-primary w-full text-center text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
							ЗАПИСАТЬСЯ НА ПРИЕМ
						</button>
						<p className="text-gray-700 text-xl !mb-4">{p.role}</p>
						<p className="text-gray-500 border-t border-gray-300 !pt-4">
							Ближайшее время:{" "}
							<span className="text-primary-dark">{p.nextTime}</span>
						</p>
					</div>

					{/* O‘ng qism */}
					<div className="md:col-span-3 flex flex-col justify-between">
						<div>
							<h2 className="text-2xl font-medium text-gray-800 mb-2">
								{p.name}
							</h2>

							{/* Teglar */}
							<div className="flex flex-wrap gap-2 mb-3">
								{p.tags.map((tag, i) => (
									<span
										key={i}
										className="px-3 py-1 border bg-primary/20 border-sky-400 text-sky-500 rounded-full text-xs"
									>
										{tag}
									</span>
								))}
							</div>

							{/* Tajriba */}
							<div className="flex items-center gap-2 text-sm mb-3">
								<img src="/portfel.svg" alt="" />
								<span className="font-medium text-sm">
									{p.experience}
								</span>
							</div>

							{/* Video vizitka */}
							<button className="px-4 py-2  border border-primary-dark text-primary-dark flex gap-2 rounded-full text-sm mb-3 hover:bg-sky-50">
								<img src="/paly.svg" alt="" />
								<span className="text-sm">
									Посмотреть видео-визитку
								</span>
							</button>

							{/* Narx */}
							<p className="text-2xl font-bold !my-4">
								{p.price}{" "}
								<span className="text-sm text-gray-500 font-normal !mb-1">
									{p.consultation}
								</span>
							</p>

							{/* Tavsif */}
							{p.descriptions.map((desc, i) => (
								<p
									key={i}
									className="text-gray-700 text-xl leading-normal !mb-2"
									dangerouslySetInnerHTML={{ __html: desc }}
								/>
							))}
						</div>

						{/* Подробнее */}
						<button className="bg-primary text-white px-12 py-2 rounded-full text-sm font-medium mt-4 self-start">
							ПОДРОБНЕЕ
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
