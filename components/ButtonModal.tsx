"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IMaskInput } from "react-imask";
import { Clock } from "lucide-react";
import Calendar from "react-calendar";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

interface ModalProps {
	isOpen: boolean;
	onClose: () => any;
	specialistId: null | number | string;
	specialist1?: any;
}

export default function ModalContent({
	isOpen,
	onClose,
	specialistId,
	specialist1,
}: ModalProps) {
	const [calendar, setCalendar] = useState<string[]>([]);
	const [timeSlots, setTimeSlots] = useState<any[]>([]);
	const [time, setTime] = useState<any>(null);
	const [online, setOnline] = useState(false);

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [smsCode, setSmsCode] = useState("");
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [timer, setTimer] = useState(0);

	const [date, setDate] = useState<Date>(new Date());

	const today = new Date();
	const threeMonthsLater = new Date();
	threeMonthsLater.setMonth(today.getMonth() + 3);

	const formatDate = (date: Date) => {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		return `${y}-${m}-${d}`;
	};

	// 🔹 Faqat bo'sh kunlarni olish — modal ochilganda
	useEffect(() => {
		if (!isOpen || !specialistId) return;

		const fetchCalendar = async () => {
			try {
				const res = await fetch(
					"https://xn--80agomhibes5b3a.xn--p1ai/get_freedate_list/",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							begin: formatDate(today),
							end: formatDate(threeMonthsLater),
							specialist_id: specialistId,
							online,
						}),
					}
				);

				if (!res.ok) throw new Error();
				const data = await res.json();
				setCalendar(data);
			} catch {
				toast.error("Ошибка загрузки календаря!");
			}
		};

		fetchCalendar();
	}, [isOpen, specialistId, online]);

	// 🔹 Timer (SMS uchun)
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => setTimer((t) => t - 1), 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	// 🔹 Sana tanlanganda vaqtlarni olish
	const fetchTimeSlots = useCallback(
		async (selectedDate: Date) => {
			try {
				const res = await fetch(
					"https://xn--80agomhibes5b3a.xn--p1ai/get_time_slot/",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							date: formatDate(selectedDate),
							online,
							specialist_id: specialistId,
						}),
					}
				);
				if (!res.ok) throw new Error();
				const data = await res.json();
				setTimeSlots(data);
			} catch {
				toast.error("Ошибка при загрузке времени!");
			}
		},
		[online, specialistId]
	);

	// 🔹 SMS yuborish
	const handleSendSMS = async () => {
		if (!name.trim() || !phone) {
			toast.error("Введите имя и номер телефона!");
			return;
		}

		const cleanPhone = phone.replace(/[^\d+]/g, "");
		try {
			const res = await fetch(
				"https://xn--80agomhibes5b3a.xn--p1ai/validation_phone_number/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ phone: cleanPhone }),
				}
			);
			if (!res.ok) throw new Error();
			setIsCodeSent(true);
			setTimer(60);
			toast.success("Код отправлен на ваш номер!");
		} catch {
			toast.error("Ошибка при отправке SMS");
		}
	};

	// 🔹 Appointment yuborish
	const sendAppointment = async () => {
		if (!smsCode.trim()) {
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
			if (!res.ok) throw new Error();
			toast.success("Вы успешно записались!");
			onClose();
		} catch {
			toast.error("Ошибка при записи!");
		}
	};

	const tileContent = ({ date, view }: { date: Date; view: string }) => {
		if (view === "month" && calendar.includes(formatDate(date))) {
			return (
				<div className="flex relative justify-center">
					<span className="w-2 h-2 absolute rounded-full bg-primary"></span>
				</div>
			);
		}
		return null;
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
					onClick={onClose}
				>
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.4, ease: "easeInOut" }}
						onClick={(e) => e.stopPropagation()}
						className="w-full max-w-sm h-full bg-white p-6 overflow-y-auto shadow-2xl"
					>
						{/* Close */}
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-800 mb-4"
						>
							✕
						</button>

						<div className="w-full border rounded-3xl border-gray-300">
							<img
								src={specialist1?.image || "/bn.png"}
								alt={specialist1?.name || "Психолог"}
								className="h-96 object-cover rounded-3xl w-full"
							/>
							<div className="mt-4 mb-6 px-6">
								<h2 className="text-2xl font-medium text-primary-dark">
									{specialist1?.name || "Психолог"}
								</h2>
								<p className="text-gray-600">
									{specialist1?.specialization || "Специалист"}
								</p>
							</div>
						</div>
						{/* Calendar */}
						<div className="w-full  !my-5 p-4 bg-white shadow rounded-xl">
							<Calendar
								value={date}
								onChange={(val) => {
									const d = val as Date;
									setDate(d);
									fetchTimeSlots(d);
								}}
								locale="ru-RU"
								tileContent={tileContent}
							/>
							<div className="flex justify-between border-t pt-4 border-gray-200 mt-4">
								<button
									onClick={() => setOnline(false)}
									className={`px-4 py-2 rounded-3xl text-sm font-medium ${
										!online
											? "bg-primary text-white hover:bg-primary-dark"
											: "bg-gray-100 hover:bg-gray-200"
									}`}
								>
									В КАБИНЕТЕ
								</button>
								<button
									onClick={() => setOnline(true)}
									className={`px-4 py-2 rounded-3xl text-sm font-medium ${
										online
											? "bg-primary text-white hover:bg-primary-dark"
											: "bg-gray-100 hover:bg-gray-200"
									}`}
								>
									ОНЛАЙН
								</button>
							</div>
						</div>

						{/* Time slots */}
						<div className="w-full max-w-sm mx-auto bg-white rounded-3xl border border-gray-200 p-6 space-y-6">
							<h2 className="font-medium text-gray-700">
								ВЫБЕРИТЕ ВРЕМЯ
							</h2>
							<div className="grid grid-cols-2 gap-3">
								{timeSlots.length > 0 ? (
									timeSlots
										.filter((t) => t.free_time)
										.map((t) => (
											<button
												key={t.id}
												onClick={() => setTime(t)}
												className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition ${
													time === t
														? "bg-sky-400 text-white border-sky-400"
														: "bg-white text-gray-600 border-gray-300 hover:border-sky-300"
												}`}
											>
												<Clock size={16} />
												<span className="text-sm">
													{t.time.substring(0, 5)}
												</span>
											</button>
										))
								) : (
									<p className="text-gray-500 text-sm col-span-2 text-center">
										Нет свободного времени
									</p>
								)}
							</div>

							{/* Form */}
							<div className="space-y-4">
								<input
									type="text"
									placeholder="Имя*"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
								/>
								<IMaskInput
									mask="+7 (000) 000-00-00"
									value={phone}
									onAccept={(val: string) => setPhone(val)}
									placeholder="+7 (___) ___-__-__"
									className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
								/>

								{isCodeSent && (
									<input
										type="text"
										placeholder="Код из SMS*"
										value={smsCode}
										onChange={(e) => setSmsCode(e.target.value)}
										className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
									/>
								)}
							</div>

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
											Отправить повторно через <b>{timer}</b> сек
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
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
