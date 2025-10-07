import React from "react";

function BaseHeader() {
	return (
		<>
			<div className="bg-black-800 ">
				<div className="container flex justify-between max-md:flex-col max-md:items-start items-center !py-2.5">
					<p className="text-white font-normal max-lg:text-sm max-md:!mb-2.5">
						г. Москва, ул. Орджоникидзе, д.11, стр. 11, 1 этаж, офис 108
					</p>
					<div className="flex gap-6 max-md:justify-between max-md:w-full items-center">
						<p className="font-medium text-lg max-lg:text-base max-md:text-lg text-white">
							+7-964-522-49-66
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
			<div className="flex gap-10 max-md:gap-6 container justify-end !py-2">
				<a className="text-xl max-md:text-base" href="#!">
					Блог
				</a>
				<a className="text-xl max-md:text-base" href="#!">
					Контакты
				</a>
				<a className="text-xl max-md:text-base" href="#!">
					Выступления
				</a>
			</div>
		</>
	);
}

export default BaseHeader;
