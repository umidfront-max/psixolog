"use client";

import { MapPin, Phone, Mail, X, Clock4 } from "lucide-react";
import { useState } from "react";

const ContactMap = () => {
	const [isOpen, setIsOpen] = useState(true);

	// Office coordinates
	const latitude = 55.706352;
	const longitude = 37.5942673;

	const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.5!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQyJzIyLjkiTiAzN8KwMzUnMzkuNCJF!5e0!3m2!1sru!2s!4v1234567890123!5m2!1sru!2s`;

	return (
		<div className="relative w-full h-[700px] max-md:h-[600px] max-sm:h-[500px] bg-gray-100 max-md:py-16">
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

			{/* Contact Information Overlay */}
			{isOpen && (
				<div className="absolute top-24 left-24 w-131 max-md:w-4/5 max-sm:w-[90%] max-md:static max-md:mx-auto  bg-white/95 backdrop-blur-sm p-8 max-md:p-4 overflow-y-auto">
					<div className="space-y-6 max-md:!space-y-3">
						<div className="flex justify-between">
							<p className="text-primary-dark">
								Подробнее как добраться....
							</p>
							<button onClick={() => setIsOpen(false)}>
								<X className="text-[#747474]" />
							</button>
						</div>

						{/* Address */}
						<div className="py-6 border-y space-y-3 max-md:py-4 border-gray-300">
							<div className="space-y-2">
								<div className="flex gap-2 text-gray-700">
									<MapPin className="w-6 h-6 font-bold text-primary" />
									<div>
										<p className="text-sm text-gray-500">
											Наш адрес:
										</p>
										<p className="leading-relaxed text-[#001E24]">
											г. Москва, ул. Орджоникидзе, д.11, стр. 11, 1
											этаж, офис 108
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex gap-2 text-gray-700">
									<Clock4 className="w-6 h-6 font-bold text-primary" />
									<div>
										<p className="text-sm text-gray-500">
											Мы работаем:
										</p>
										<p className="leading-relaxed text-[#001E24]">
											ежедневно 10.00-20.00
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex gap-2 text-gray-700">
									<Mail className="w-6 h-6 font-bold text-primary" />
									<div>
										<p className="text-sm text-gray-500">
											Наша почта:
										</p>
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

						<div className="flex justify-center items-center gap-4">
							<p className="text-[#747474] max-sm:text-sm">
								Мы в соц сетях:
							</p>
							<div className="flex gap-4 max-sm:gap-3">
								<a
									className="w-6 h-6 rounded bg-white flex justify-center p-0.5 pr-1"
									href="https://t.me/your_channel"
									target="_blank"
								>
									<img src={"/tg.svg"} alt="" />
								</a>
								<a
									className="w-6 h-6 rounded bg-white flex items-center justify-center p-0.5"
									href="https://vk.com/your_page"
									target="_blank"
								>
									<img src={"/wk.svg"} alt="" />
								</a>
								<a
									className="w-6 h-6 rounded bg-white flex justify-center p-0.5"
									href="https://wa.me/71234567890"
									target="_blank"
								>
									<img src={"/wat.svg"} alt="" />
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
