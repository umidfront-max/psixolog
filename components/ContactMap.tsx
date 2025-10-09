"use client";

import { MapPin, Phone, Mail, X, Clock4 } from "lucide-react";
import { useState } from "react";

const ContactMap = () => {
	const [isOpen, setIsOpen] = useState(true);

	// Ofis koordinatalari
	const latitude = 55.706352;
	const longitude = 37.5942673;

	const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.5!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQyJzIyLjkiTiAzN8KwMzUnMzkuNCJF!5e0!3m2!1sru!2s!4v1234567890123!5m2!1sru!2s`;

	return (
		<div className="relative w-full h-[700px] max-md:h-[600px] max-sm:h-[500px] bg-gray-100 max-md:py-16 overflow-hidden">
			{/* Google Map */}
			<div className="absolute inset-0">
				<iframe
					src={mapSrc}
					width="100%"
					height="100%"
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="w-full h-full"
				/>
			</div>

			{/* Custom “МЫ ЗДЕСЬ!” Marker */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] flex flex-col items-center animate-bounce">
				<div className="bg-[#00C4FF] text-white text-center font-semibold text-sm px-4 py-2 rounded-full shadow-lg">
					МЫ <br /> ЗДЕСЬ!
				</div>
				<div
					className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-[#00C4FF]"
					style={{ marginTop: "-2px" }}
				/>
			</div>

			{/* Contact Information Overlay */}
			{isOpen && (
				<div className="absolute top-24 left-24 w-[480px] max-md:w-4/5 max-sm:w-[90%] max-md:static max-md:mx-auto bg-white/95 backdrop-blur-sm p-8 max-md:p-4 overflow-y-auto rounded-2xl shadow-lg">
					<div className="space-y-6 max-md:!space-y-3">
						<div className="flex justify-between items-center">
							<p className="text-primary-dark font-medium">
								Подробнее как добраться...
							</p>
							<button onClick={() => setIsOpen(false)}>
								<X className="text-[#747474] hover:text-black transition" />
							</button>
						</div>

						{/* Address */}
						<div className="py-6 border-y space-y-3 max-md:py-4 border-gray-300">
							<div className="space-y-2">
								<div className="flex gap-2 text-gray-700">
									<MapPin className="w-6 h-6 text-primary" />
									<div>
										<p className="text-sm text-gray-500">Наш адрес:</p>
										<p className="leading-relaxed text-[#001E24]">
											г. Москва, ул. Орджоникидзе, д.11, стр. 11, 1 этаж,
											офис 108
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex gap-2 text-gray-700">
									<Clock4 className="w-6 h-6 text-primary" />
									<div>
										<p className="text-sm text-gray-500">Мы работаем:</p>
										<p className="leading-relaxed text-[#001E24]">
											ежедневно 10.00–20.00
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex gap-2 text-gray-700">
									<Mail className="w-6 h-6 text-primary" />
									<div>
										<p className="text-sm text-gray-500">Наша почта:</p>
										<p className="leading-relaxed text-[#001E24]">
											info@example.com
										</p>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h1 className="text-2xl text-center font-medium max-md:text-base">
								+7-964-522-49-66
							</h1>
							<p className="text-center text-sm text-[#747474] max-sm:text-xs">
								Звоните или оставляйте заявку
							</p>
						</div>

						{/* Social icons */}
						<div className="flex justify-center items-center gap-4">
							<p className="text-[#747474] max-sm:text-sm">Мы в соц сетях:</p>
							<div className="flex gap-4 max-sm:gap-3">
								<a
									className="w-8 h-8 rounded bg-white flex justify-center items-center p-1 hover:scale-110 transition"
									href="https://t.me/your_channel"
									target="_blank"
								>
									<img className="w-full" src={"/tg.svg"} alt="Telegram" />
								</a>
								<a
									className="w-8 h-8 rounded bg-white flex justify-center items-center p-1  hover:scale-110 transition"
									href="https://vk.com/your_page"
									target="_blank"
								>
									<img className="w-full" src={"/wk.svg"} alt="VK" />
								</a>
								<a
									className="w-8 h-8 rounded bg-white flex justify-center items-center p-1  hover:scale-110 transition"
									href="https://wa.me/71234567890"
									target="_blank"
								>
									<img className="w-full" src={"/wat.svg"} alt="WhatsApp" />
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactMap;
