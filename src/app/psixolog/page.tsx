"use client";
import Image from "next/image";
import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";


export default function Psixolog() {
	const [date, setDate] = useState(new Date());

	// Default belgilanadigan sanalar
	const markedDates = [
		new Date(2025, 2, 13), // 13 mart 2025
		new Date(2025, 2, 18),
	];

	// Belgilangan sanani style qilish
	const tileClassName = ({ date }: { date: Date }) => {
		if (markedDates.find((d) => d.toDateString() === date.toDateString())) {
			return "bg-blue-500 text-white rounded-full";
		}
		return "";
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">
			{/* Chap qism */}
			<div className="flex flex-col items-center space-y-6">
				<div className="w-full">
					<img
						src={"/u1.png"}
						alt="Наталья Наумова"
						className="rounded-2xl object-cover w-full"
					/>
					<div className="mt-3 text-center">
						<h2 className="text-lg font-bold text-sky-700">
							НАТАЛЬЯ НАУМОВА
						</h2>
						<p className="text-gray-600">
							Психолог, детский нейропсихолог
						</p>
					</div>
				</div>

				{/* Calendar */}
				<div className="w-full p-4 bg-white shadow rounded-xl">
					<h3 className="text-center font-semibold mb-2">МАРТ 2025</h3>
					<Calendar
						value={date}
						tileClassName={tileClassName}
					/>
					<div className="flex justify-between mt-4">
						<button className="bg-sky-700 text-white px-4 py-2 rounded-xl hover:bg-sky-800">
							В КАБИНЕТЕ
						</button>
						<button className="bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200">
							ОНЛАЙН
						</button>
					</div>
				</div>
			</div>

			{/* O‘ng qism */}
			<div className="md:col-span-2 space-y-6">
				<section className="bg-white shadow rounded-2xl p-6">
					<h3 className="text-xl font-semibold mb-4">ОБО МНЕ</h3>
					<p className="text-gray-700 mb-4">
						Сертифицированный специалист факультета психологии МГУ им
						Ломоносова с опытом работы более 15 лет, с детьми, взрослыми и
						семьями.
					</p>
					<p className="text-gray-700 mb-4">
						Действительный член{" "}
						<a
							href="#"
							className="text-blue-600 underline hover:text-blue-800"
						>
							Национальной саморегулируемой организации «Союз
							психотерапевтов и психологов»
						</a>
					</p>
					<p className="text-gray-700">
						Психолог-эксперт, участница теле- и радиэфиров, автор более
						150 научных и научно-популярных статей о психологии.
					</p>

					{/* YouTube Video */}
					<div className="mt-6">
						<iframe
							width="100%"
							height="300"
							src="https://www.youtube.com/embed/VIDEO_ID" // YouTube ID o'zingni qo'yasan
							title="YouTube video"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="rounded-xl"
						></iframe>
					</div>
				</section>

				{/* Ta'lim */}
				<section className="bg-white shadow rounded-2xl p-6">
					<h3 className="text-xl font-semibold mb-4">
						ОБРАЗОВАНИЕ ОСНОВНОЕ
					</h3>
					<ul className="space-y-3">
						<li className="flex items-center gap-3">
							<span className="p-2 rounded-lg bg-sky-100">🎓</span>
							<div>
								<p className="font-medium">Институт психоанализа</p>
								<p className="text-gray-600 text-sm">
									психолог, психолог-консультант, семейный
									психотерапевт
								</p>
							</div>
						</li>
						<li className="flex items-center gap-3">
							<span className="p-2 rounded-lg bg-sky-100">🎓</span>
							<div>
								<p className="font-medium">МГУ им Ломоносова</p>
								<p className="text-gray-600 text-sm">
									детский нейропсихолог
								</p>
							</div>
						</li>
					</ul>
				</section>

				{/* Xizmatlar */}
				<section className="bg-white shadow rounded-2xl p-6">
					<h3 className="text-xl font-semibold mb-4">
						ПРЕДОСТАВЛЯЕМЫЕ УСЛУГИ:
					</h3>
					<ul className="list-disc list-inside text-sky-700 font-medium">
						<li>ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ ВЗРОСЛЫМ И ДЕТЯМ</li>
					</ul>
				</section>
			</div>
		</div>
	);
}
