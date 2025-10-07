"use client";
import Image from "next/image";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Clock } from "lucide-react";
import { IMaskInput } from "react-imask";

function CalendarPage() {
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
		<div className="container calendar !my-10">
			{/* Calendar */}
			<div className="w-full rounded-3xl  px-50 py-10 bg-[#F4F4F440] max-lg:!px-10 max-sm:!px-1 max-sm:py-4 border border-gray-300">
				<Calendar
					className="!w-full h-100 !bg-transparent"
					value={date}
					onChange={(val) => setDate(val as Date)}
					locale="ru-RU"
					tileContent={tileContent}
				/>
				<div className="flex justify-between gap-4 border-t pt-4 border-gray-200 mt-4">
					<button className="bg-primary w-75 text-center text-white px-4 py-2 rounded-3xl hover:bg-primary-dark text-sm font-medium">
						В КАБИНЕТЕ
					</button>
					<button className="bg-white w-75 text-center border border-gray-400 px-4 py-2 rounded-3xl hover:bg-gray-200  text-sm font-medium">
						ОНЛАЙН
					</button>
				</div>
			</div>
			<div className="w-full rounded-3xl  px-50 py-10 bg-[#F4F4F440] max-lg:!px-10 max-sm:!px-4 max-sm:py-5 border border-gray-300">
				<h2 className="font-medium text-gray-700 !mb-6">ВЫБЕРИТЕ ВРЕМЯ</h2>

				{/* Time slots */}
				<div className="grid grid-cols-4 max-sm:grid-cols-3 max-[490px]:!grid-cols-2 gap-3">
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
				<div className="space-y-4 !mt-6">
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
						type="password"
						placeholder="Код из CVC*"
						className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
					/>
				</div>

				{/* Submit button */}
				<button className="w-75 block !mx-auto !mt-10 bg-primary hover:bg-primary-dark text-white py-3 rounded-3xl font-medium transition">
					ПОЛУЧИТЬ КОД
				</button>
			</div>
		</div>
	);
}

export default CalendarPage;
