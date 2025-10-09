"use client";
import Image from "next/image";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Clock } from "lucide-react";
import { IMaskInput } from "react-imask";
import ButtonModal from "../../../components/ButtonModal";
export default function Psixolog() {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState<string | null>(null);
	const times = [
		"09:00–10:00",
		"10:00–11:00",
		"11:00–12:00",
		"12:00–13:00",
		"14:00–15:00",
		"15:00–16:00",
		"16:00–17:00",
		"17:00–18:00",
	];
	// Doimiy ko‘rinadigan nuqtalar (2 va 3 oktabr)
	const defaultDates = [new Date(2025, 9, 2), new Date(2025, 9, 3)];

	// Endi faqat bitta sanani tanlash mumkin
	const [date, setDate] = useState<Date | null>(null);

	// Har doim default sanalarda 🔵 nuqta ko‘rsatish
	const tileContent = ({ date, view }: { date: Date; view: string }) => {
		if (view === "month") {
			if (
				defaultDates.find((d) => d.toDateString() === date.toDateString())
			) {
				return (
					<div className="flex relative justify-center">
						<span className="w-2 h-2 absolute rounded-full bg-primary"></span>
					</div>
				);
			}
		}
		return null;
	};
	return (
		<div className="container !py-10 max-md:!py-6 grid md:grid-cols-3 max-xl:gap-10 gap-20">
			<ButtonModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			{/* Chap qism */}
			<div className="flex flex-col items-center space-y-6 max-lg:hidden">
				<div className="w-full border rounded-4xl border-gray-300">
					<img
						src={"/bn.png"}
						alt="Наталья Наумова"
						className="h-124 object-cover rounded-4xl w-full"
					/>
					<div className="mt-6 mb-14 px-6">
						<h2 className="text-2xl font-medium text-primary-dark">
							НАТАЛЬЯ НАУМОВА
						</h2>
						<p className="text-gray-600">
							Психолог, детский нейропсихолог
						</p>
					</div>
				</div>

				{/* Calendar */}
				<div className="w-full p-4 bg-white shadow rounded-xl">
					<Calendar
						value={date}
						onChange={(val) => setDate(val as Date)}
						locale="ru-RU"
						tileContent={tileContent}
					/>
					<div className="flex justify-between border-t pt-4 border-gray-200 mt-4">
						<button className="bg-primary text-white px-4 py-2 rounded-3xl hover:bg-primary-dark text-sm font-medium">
							В КАБИНЕТЕ
						</button>
						<button className="bg-gray-100 px-4 py-2 rounded-3xl hover:bg-gray-200  text-sm font-medium">
							ОНЛАЙН
						</button>
					</div>
				</div>
				<div className="max-w-sm mx-auto bg-white rounded-3xl border border-gray-200  p-6 space-y-6">
					<h2 className="font-medium text-gray-700">ВЫБЕРИТЕ ВРЕМЯ</h2>

					{/* Time slots */}
					<div className="grid grid-cols-2 gap-3">
						{times.map((t) => (
							<button
								key={t}
								onClick={() => setTime(t)}
								className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition ${
									time === t
										? "bg-sky-400 text-white border-sky-400"
										: "bg-white text-gray-600 border-gray-300 hover:border-sky-300"
								}`}
							>
								<Clock size={16} />
								<span className="text-sm">{t}</span>
							</button>
						))}
					</div>

					{/* Form inputs */}
					<div className="space-y-4">
						<input
							type="text"
							placeholder="Имя*"
							className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
						/>
						<IMaskInput
							mask="+7 (000) 000-00-00"
							placeholder="+7 (___) ___-__-__"
							lazy={false} // placeholderdagi bo‘sh joylar ko‘rinib turadi
							className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
						/>
						<input
							type="text"
							placeholder="Код из SMS*"
							className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
						/>
					</div>

					{/* Submit button */}
					<button className="w-full bg-sky-400 hover:bg-sky-500 text-white py-3 rounded-xl font-semibold transition">
						ПОЛУЧИТЬ КОД
					</button>
				</div>
			</div>

			{/* O‘ng qism */}
			<div className="col-span-2 max-lg:col-span-3 space-y-6">
				<section className="bg-white border border-gray-200 rounded-2xl p-10 max-xl:p-6 max-sm:p-3">
					<h3 className="text-2xl max-sm:text-xl font-medium mb-4">
						ОБО МНЕ
					</h3>
					<div className="p-4 bg-[#FCF9FF] text-xl  max-sm:text-base rounded-4xl rounded-tl-md text-[#001E24]">
						<p className="text-gray-700 mb-4">
							Сертифицированный специалист факультета психологии МГУ им
							Ломоносова с опытом работы более 15 лет, с детьми,
							взрослыми и семьями.
						</p>
						<p className="text-gray-700 !my-4">
							Действительный член{" "}
							<a
								href="https://psy-org.ru/"
								target="_blank"
								className="text-primary-dark underline hover:text-primary"
							>
								Национальной саморегулируемой организации «Союз
								психотерапевтов и психологов»
							</a>
						</p>
						<p className="!mt-2">
							Психолог-эксперт, участница теле- и радиэфиров, автор более
							150 научных и научно-популярных статей о психологии.
						</p>
					</div>
					{/* YouTube Video */}
					<div className="mt-6">
						<iframe
							src="https://www.youtube.com/embed/_1r2FihbgPA?list=PLeRD4s8cOayJA5P-ng5GjpWiWC36fse-g"
							title="YouTube video"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="rounded-xl w-full h-95"
						/>
					</div>
					{/* Ta'lim */}
					<section className="mt-6">
						<h3 className="text-2xl  max-sm:text-base font-medium mb-4">
							ОБРАЗОВАНИЕ ОСНОВНОЕ
						</h3>
						<ul className="space-y-3">
							<li className="flex p-6 rounded-3xl bg-[#F7F9FC] items-center gap-5 max-md:p-2">
								<div className="p-3 bg-[#001E24] rounded-xl">
									<img className="w-6 h-6" src="/icon1.svg" alt="" />
								</div>
								<div className="flex-1">
									<p className="text-primary">Институт психоанализа</p>
									<p className="text-gray-600 text-xl max-sm:text-sm">
										психолог, психолог-консультант, семейный
										психотерапевт
									</p>
								</div>
							</li>
							<li className="flex p-6 rounded-3xl bg-[#F7F9FC] items-center gap-5 max-md:p-2">
								<div className="p-3 bg-[#001E24] rounded-xl">
									<img className="w-6 h-6" src="/icon1.svg" alt="" />
								</div>
								<div className="flex-1">
									<p className=" text-primary">МГУ им Ломоносова</p>
									<p className="text-gray-600 text-xl max-sm:text-sm">
										детский нейропсихолог
									</p>
								</div>
							</li>
						</ul>
					</section>
				</section>

				<button
					onClick={() => setIsOpen(true)}
					className="py-3 mx-auto max-lg:block hidden text-white text-sm w-[313px] text-center bg-primary rounded-3xl"
				>
					ЗАПИСАТЬСЯ НА ПРИЕМ
				</button>

				{/* Xizmatlar */}
				<section className="space-y-8 max-md:!mt-8">
					<h2 className="text-3xl max-lg:text-lg max-sm:text-sm font-medium">
						ПРЕДОСТАВЛЯЕМЫЕ УСЛУГИ:
					</h2>

					{/* 1 - Психологическая помощь взрослым и детям */}
					<div>
						<h3 className="flex items-center gap-2 text-2xl max-lg:text-lg max-sm:text-sm text-purple-600 font-medium">
							<img className="w-8 " src="/p1.svg" alt="" />
							ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ ВЗРОСЛЫМ И ДЕТЯМ
						</h3>
						<div className="bg-purple-50 rounded-tl-md rounded-4xl p-4 mt-2 space-y-2 text-gray-700">
							<ul className="list-none list-inside space-y-2">
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-purple-600 "></div>{" "}
									Помощь во взаимоотношениях с детьми и взрослыми;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-purple-600 "></div>{" "}
									Помощь при выходе из критической ситуации;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-purple-600 "></div>{" "}
									Преодоление детских страхов;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-purple-600 "></div>{" "}
									Помощь в случае, если ребёнок не хочет учиться.
								</li>
							</ul>
						</div>
					</div>

					{/* 2 - Нейропсихологическая помощь */}
					<div>
						<h3 className="flex  gap-2 text-primary-dark text-2xl max-lg:text-lg max-sm:text-sm font-medium">
							<img className="w-8 " src="/p2.svg" alt="" />
							НЕЙРОПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ
						</h3>
						<div className="bg-cyan-50 rounded-tl-md rounded-4xl p-4 mt-2 space-y-2 text-gray-700">
							<ul className="list-inside space-y-2 text-xl">
								<li className="flex gap-5 items-start text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b mt-3.5 border-primary-dark "></div>{" "}
									Помощь истощаемым, быстро устающим детям. Улучшаем
									умственную активность;
								</li>
								<li className="flex gap-5 items-start text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b mt-3.5 border-primary-dark "></div>{" "}
									Помогаем ребёнку стать успешным в учёбе;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark "></div>{" "}
									Научим управлять своими эмоциями, контролировать
									себя;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark"></div>{" "}
									Помощь несамостоятельным детям;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark"></div>{" "}
									Помощь детям с синдромом дефицита внимания и
									гиперактивности;
								</li>{" "}
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark"></div>{" "}
									Готовим ребёнка к успешному обучению в школе.
								</li>
							</ul>
						</div>
					</div>
					<div>
						<h3 className="flex items-center gap-2 text-2xl max-lg:text-lg max-sm:text-sm text-purple-600 font-medium">
							<img className="w-8" src="/p3.svg" alt="" />
							СЕМЕЙНАЯ ПСИХОТЕРАПИЯ
						</h3>
						<div className="bg-purple-50 rounded-tl-md rounded-4xl p-4 mt-2 space-y-2 text-gray-700">
							<ul className="list-none list-inside space-y-2">
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-purple-600 "></div>{" "}
									Помощь семье в период кризиса, развод;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-purple-600 "></div>{" "}
									Помощь в принятии и понимании своего ребёнка;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-purple-600 "></div>{" "}
									Выстраивание доверительных отношений с супругом и
									детьми;
								</li>
								<li className="flex gap-5  text-xl">
									<div className="h-[1px] w-4 max-lg:text-base mt-3.5 border-b border-purple-600 "></div>{" "}
									Разрешение конфликтов супругов и нахождение
									конструктивных решений.
								</li>
							</ul>
						</div>
					</div>
					<div>
						<h3 className="flex  gap-2 text-primary-dark text-2xl max-lg:text-lg max-sm:text-sm font-medium">
							<img className="w-8 " src="/p4.svg" alt="" />
							ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ ВЗРОСЛЫМ
						</h3>
						<div className="bg-cyan-50 rounded-tl-md rounded-4xl p-4 mt-2 space-y-2 text-gray-700">
							<ul className="list-inside space-y-2 text-xl">
								<li className="flex gap-5 items-start text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b mt-3.5 border-primary-dark "></div>{" "}
									Помощь в постановке и достижении целей;
								</li>
								<li className="flex gap-5 items-start text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b mt-3.5 border-primary-dark "></div>{" "}
									Помощь в осознании и контроле за своими мыслями и
									чувствами;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark "></div>{" "}
									Помощь в принятии серьёзных решений;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark"></div>{" "}
									Преодоление страхов и тревожности;
								</li>
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark"></div>{" "}
									Снятие психоэмоционального напряжения;
								</li>{" "}
								<li className="flex gap-5 items-center text-xl">
									<div className="h-[1px] w-4 max-lg:text-base border-b border-primary-dark"></div>{" "}
									Решение жизненных проблем и сложных ситуаций.
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
