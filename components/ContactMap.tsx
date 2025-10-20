"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapPin, Clock4, Mail, X } from "lucide-react";

// Custom HTML marker ("МЫ ЗДЕСЬ!")
const createCustomMarker = () =>
	L.divIcon({
		className: "custom-marker", // CSS bilan boshqaramiz
		html: `
      <div class="flex flex-col items-center animate-bounce">
        <div class="bg-[#00C4FF] text-white text-center font-semibold text-sm px-4 py-2 rounded-full shadow-lg">
          МЫ <br /> ЗДЕСЬ!
        </div>
        <div
          class="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-[#00C4FF]"
          style="margin-top:-2px;"
        ></div>
      </div>
    `,
		iconAnchor: [40, 70], // markerni markazga to‘g‘rilaydi
	});

const ContactMap = () => {
	const [isOpen, setIsOpen] = useState(true);

	// Koordinatalar
	const latitude = 55.706352;
	const longitude = 37.5942673;

	return (
		<div className="relative w-full h-[700px] bg-gray-100 overflow-hidden">
			{/* Interaktiv xarita */}
			<MapContainer
				center={[latitude, longitude]}
				zoom={16}
				scrollWheelZoom={false}
				className="w-full h-full z-0"
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; OpenStreetMap contributors"
				/>
				<Marker
					position={[latitude, longitude]}
					icon={createCustomMarker()}
				/>
			</MapContainer>

			{/* Kontakt ma’lumotlari */}
			{isOpen && (
				<div className="absolute top-24 left-24 w-[480px] max-md:w-4/5 max-sm:w-[90%] bg-white/95 backdrop-blur-sm p-8 max-md:p-4 rounded-2xl shadow-lg z-[1000]">
					<div className="flex justify-between items-center mb-4">
						<p className="text-primary-dark font-medium">
							Подробнее как добраться...
						</p>
						<button onClick={() => setIsOpen(false)}>
							<X className="text-[#747474] hover:text-black transition" />
						</button>
					</div>

					<div className="space-y-4">
						<div className="flex gap-2 text-gray-700">
							<MapPin className="w-6 h-6 text-primary" />
							<div>
								<p className="text-sm text-gray-500">Наш адрес:</p>
								<p>
									г. Москва, ул. Орджоникидзе, д.11, стр.11, офис 108
								</p>
							</div>
						</div>

						<div className="flex gap-2 text-gray-700">
							<Clock4 className="w-6 h-6 text-primary" />
							<div>
								<p className="text-sm text-gray-500">Мы работаем:</p>
								<p>ежедневно 10.00–20.00</p>
							</div>
						</div>

						<div className="flex gap-2 text-gray-700">
							<Mail className="w-6 h-6 text-primary" />
							<div>
								<p className="text-sm text-gray-500">Наша почта:</p>
								<p>info@example.com</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactMap;
