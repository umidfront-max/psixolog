"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { IMaskInput } from "react-imask";
import ButtonModal from "../components/ButtonModal";
import { useSearchParams } from "next/navigation";
interface Specialist {
	specialist_id: number;
	name: string;
	photo: string;
	order: number;
	time_slot_duration: number;
	video: null | string;
	base_price: number;
	short_description: string;
	long_description: string;
}

export default function Psixolog() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const [specialist, setSpecialist] = useState<Specialist | null>(null);
	const [calendar, setCalendar] = useState<string[]>([]);
	const [date, setDate] = useState<Date>(new Date());
	const [time, setTime] = useState<any>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [timeSlots, setTimeSlots] = useState<any[]>([]);

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [smsCode, setSmsCode] = useState("");
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [timer, setTimer] = useState(0);

	const today = new Date();
	const threeMonthsLater = new Date();
	threeMonthsLater.setMonth(today.getMonth() + 3);

	function formatDate1(date: Date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	const [formData, setFormData] = useState<any>({
		begin: formatDate1(today),
		end: formatDate1(threeMonthsLater),
		specialist_id: id,
		online: false,
	});
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => setTimer((t) => t - 1), 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	const handleSendSMS = async () => {
		console.log(phone);
		if (!name.trim()) {
			toast.error("Введите имя");
			return;
		}
		if (!phone) {
			toast.error("Введите имя и номер телефона!");
			return;
		}
		const cleanPhone = phone.replace(/[^\d+]/g, "");
		try {
			// SMS yuborish API (misol uchun)
			const res = await fetch(
				"https://xn--80agomhibes5b3a.xn--p1ai/validation_phone_number/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ phone: cleanPhone }),
				}
			);

			if (!res.ok) throw new Error("Ошибка отправки СМС");
			setIsCodeSent(true);
			setTimer(60); // 1 daqiqa
			toast.success("Код отправлен на ваш номер!");
		} catch (err) {
			console.error(err);
			toast.error("Ошибка при отправке SMS");
		}
	};
	// 🔹 API dan sanalarni olish
	const fetchCalendar = useCallback(async () => {
		try {
			setLoading(true);
			const res = await fetch(
				"https://xn--80agomhibes5b3a.xn--p1ai/get_freedate_list/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);

			if (!res.ok) throw new Error("API xatosi");
			const data = await res.json();
			setCalendar(data);
		} catch (err) {
			console.error("Xato:", err);
		} finally {
			setLoading(false);
		}
	}, [formData]);

	// 🔹 Mutaxassisni olish
	const fetchSpecialists = useCallback(async () => {
		try {
			const res = await fetch(
				"https://xn--80agomhibes5b3a.xn--p1ai/specialist/" + id
			);
			if (!res.ok) throw new Error("API xatosi");
			const data = await res.json();
			setSpecialist(data);
		} catch (err) {
			console.error("Xato:", err);
		}
	}, [id]);

	const fetchTimeSlots = useCallback(
		async (selectedDate: Date) => {
			try {
				const res = await fetch(
					"https://xn--80agomhibes5b3a.xn--p1ai/get_time_slot/",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							date: formatDate1(selectedDate),
							online: formData.online,
							specialist_id: id,
						}),
					}
				);

				if (!res.ok) throw new Error("API xatosi");
				const data = await res.json();
				setTimeSlots(data); // bu massiv bo‘lishi kerak (masalan ["09:00","10:00",...])
			} catch (err) {
				console.error("Vaqtni olishda xato:", err);
			}
		},
		[formData.online, id]
	);
	// 🔹 Dastlabki yuklanish
	useEffect(() => {
		fetchCalendar();
		fetchSpecialists();
	}, [fetchCalendar, fetchSpecialists]);

	// 🔹 Online yoki kabinet o‘zgarsa — qayta so‘rov
	useEffect(() => {
		fetchCalendar();
	}, [formData.online, fetchCalendar]);

	const sendAppointment = async () => {
		if (!smsCode) {
			toast.error("Введите код из SMS!");
			return;
		}

		const cleanPhone = phone.replace(/[^\d+]/g, "");
		const payload = {
			phone: cleanPhone,
         timeslot_id: time?.id,
         description: "empty",
			code_validation: smsCode,
			name,
		};

		try {
			const res = await fetch(
				"https://xn--80agomhibes5b3a.xn--p1ai/appointment/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				}
			);
			if (!res.ok) throw new Error("Ошибка при записи!");
			toast.success("Вы успешно записались!");
		} catch (err) {
			console.error(err);
			toast.error("Ошибка при создании записи!");
		}
	};

	// 🔹 Sana belgisi (API dan kelgan sanalarda nuqta)
	const tileContent = ({ date, view }: { date: Date; view: string }) => {
		if (view === "month") {
			const formatted = formatDate1(date);
			if (calendar.includes(formatted)) {
				return (
					<div className="flex relative justify-center">
						<span className="w-2 h-2 absolute rounded-full bg-primary"></span>
					</div>
				);
			}
		}
		return null;
	};

	const imgUrl = specialist?.photo?.startsWith("http")
		? specialist.photo
		: `https://xn--80agomhibes5b3a.xn--p1ai/${specialist?.photo?.replace(
				/\\/g,
				"/"
		  )}`;
	return (
		<div className="container !py-10 max-md:!py-6 grid md:grid-cols-3 max-xl:gap-10 gap-20">
			<ButtonModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			{/* Chap qism */}
			<div className="flex flex-col items-center space-y-6 max-lg:hidden">
				<div className="w-full border rounded-4xl border-gray-300">
					<img
						src={imgUrl}
						alt="Наталья Наумова"
						className="h-124 object-cover rounded-4xl w-full"
					/>
					<div className="mt-6 mb-14 px-6">
						<h2 className="text-2xl font-medium text-primary-dark">
							{specialist?.name}
						</h2>
						<p className="text-gray-600">
							{specialist?.long_description}
						</p>
					</div>
				</div>

				{/* Calendar */}
				<div className="w-full p-4 bg-white shadow rounded-xl">
					<Calendar
						value={date}
						onChange={(val) => {
							const newDate = val as Date;
							setDate(newDate);
							fetchTimeSlots(newDate); // 🔹 sana tanlanganda vaqt slotlarini olish
						}}
						locale="ru-RU"
						tileContent={tileContent}
					/>
					<div className="flex justify-between border-t pt-4 border-gray-200 mt-4">
						<button
							onClick={() => setFormData({ ...formData, online: false })}
							className={`px-4 py-2 rounded-3xl text-sm font-medium ${
								!formData.online
									? "bg-primary text-white hover:bg-primary-dark"
									: "bg-gray-100 hover:bg-gray-200"
							}`}
						>
							В КАБИНЕТЕ
						</button>

						<button
							onClick={() => setFormData({ ...formData, online: true })}
							className={`px-4 py-2 rounded-3xl text-sm font-medium ${
								formData.online
									? "bg-primary text-white hover:bg-primary-dark"
									: "bg-gray-100 hover:bg-gray-200"
							}`}
						>
							ОНЛАЙН
						</button>
					</div>
				</div>
				<div className="max-w-sm mx-auto w-full bg-white rounded-3xl border border-gray-200  p-6 space-y-6">
					<h2 className="font-medium text-gray-700">ВЫБЕРИТЕ ВРЕМЯ</h2>

					{/* Time slots */}
					<div className="grid grid-cols-2 gap-3">
						{timeSlots && timeSlots.length > 0 ? (
							timeSlots
								?.filter((el) => el.free_time)
								?.map((t) => (
									<button
										key={t?.id}
										onClick={() => setTime(t)}
										className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition ${
											time === t
												? "bg-sky-400 text-white border-sky-400"
												: "bg-white text-gray-600 border-gray-300 hover:border-sky-300"
										}`}
									>
										<Clock size={16} />
										<span className="text-sm">{t?.time?.substring(0,5)}</span>
									</button>
								))
						) : (
							<p className="text-gray-500 col-span-2 text-center">
								Свободного времени нет
							</p>
						)}
					</div>
					{/* Form inputs */}
					{time && (
						<div className="space-y-4">
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Имя*"
								className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
							/>
							<IMaskInput
								mask="+7 (000) 000-00-00"
								value={phone}
								onAccept={(val: string) => setPhone(val)}
								placeholder="+7 (___) ___-__-__"
								lazy={false}
								className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
							/>

							{isCodeSent && (
								<input
									type="text"
									value={smsCode}
									onChange={(e) => setSmsCode(e.target.value)}
									placeholder="Код из SMS*"
									className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
								/>
							)}

							{/* Buttons */}
							{!isCodeSent ? (
								<button
									onClick={handleSendSMS}
									className="w-full bg-sky-400 hover:bg-sky-500 text-white py-3 rounded-xl font-semibold transition"
								>
									ПОЛУЧИТЬ КОД
								</button>
							) : (
								<div className="space-y-4 text-center">
									{timer > 0 ? (
										<p className="text-gray-500 text-sm">
											Отправить повторно через{" "}
											<span className="font-semibold">{timer}</span>{" "}
											сек
										</p>
									) : (
										<button
											onClick={handleSendSMS}
											className="text-sky-500 text-sm underline hover:text-sky-600"
										>
											Отправить код повторно
										</button>
									)}

									<button
										onClick={sendAppointment}
										className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition"
									>
										ЗАПИСАТЬСЯ
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* O‘ng qism */}
			<div className="col-span-2 max-lg:col-span-3 space-y-6">
				<section className="bg-white border border-gray-200 rounded-2xl p-10 max-xl:p-6 max-sm:p-3">
					<h3 className="text-2xl max-sm:text-xl font-medium mb-4">
						ОБО МНЕ
					</h3>
					<div className="p-4 bg-[#FCF9FF] text-xl  max-sm:text-base rounded-4xl rounded-tl-md text-[#001E24]">
						<p>{specialist?.short_description}</p>
					</div>
					{/* YouTube Video */}
					{specialist?.video && (
						<div className="mt-6">
							<iframe
								src={specialist.video}
								title="YouTube video"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="rounded-xl w-full h-95"
							/>
						</div>
					)}
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
