import React from "react";

function BaseMain() {
	return (
		<div className="h-100 flex items-center bg-[url('/bg.png')] bg-cover bg-center">
			<div className="container flex justify-between ">
				<div>
					<button className="font-medium px-21 py-3 bg-primary hover:bg-primary-dark transition rounded-3xl">
						ВЫБРАТЬ ПСИХОЛОГА
					</button>
					<p className="text-4xl font-medium !mt-8">КАБИНЕТ ПСИХОЛОГА</p>
					<p className="text-[52px] font-medium text-primary-dark">
						НАТАЛЬИ НАУМОВОЙ
					</p>
				</div>
				<div>
					<div className="flex gap-4.5 items-center w-fit px-8 py-5 bg-white rounded-3xl border border-gray-200">
						<img src={"./yandex.svg"} alt="" />
						<p className="font-bold text-3xl">5.0</p>
						<div>
							<div className="flex">
								<img src={"./star.svg"} alt="" />
								<img src={"./star.svg"} alt="" />
								<img src={"./star.svg"} alt="" />
								<img src={"./star.svg"} alt="" />
								<img src={"./star.svg"} alt="" />
							</div>
							<p className="text-[13px] font-medium whitespace-nowrap">
								121 отзыв
							</p>
						</div>
					</div>
					<button className="font-medium mt-8 px-21 py-3 bg-primary hover:bg-primary-dark transition rounded-3xl">
						ВЫБРАТЬ ПСИХОЛОГА
					</button>
				</div>
			</div>
		</div>
	);
}

export default BaseMain;
