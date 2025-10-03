import React from "react";

function Footer() {
	return (
		<div className="py-7 bg-black text-white">
			<div className="container flex justify-between items-center">
				<div className="flex gap-10 ">
					<a className="text-sm " href="#!">
						Блог
					</a>
					<a className="text-sm " href="#!">
						Контакты
					</a>
					<a className="text-sm " href="#!">
						Выступления
					</a>
				</div>
				<div className="flex gap-4">
					<a
						className="w-6 h-6 rounded bg-white flex justify-center p-0.5 pr-1"
						href="#!"
					>
						<img src={"/tg.svg"} alt="" />
					</a>
					<a
						className="w-6 h-6 rounded bg-white flex items-center justify-center p-0.5"
						href="#!"
					>
						<img src={"/wk.svg"} alt="" />
					</a>
					<a
						className="w-6 h-6 rounded bg-white flex justify-center p-0.5"
						href="#!"
					>
						<img src={"/wat.svg"} alt="" />
					</a>
				</div>
			</div>
		</div>
	);
}

export default Footer;
