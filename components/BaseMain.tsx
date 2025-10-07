"use client";
import React from "react";
import { useRouter } from "next/navigation";

function BaseMain() {
	const router = useRouter();
	return (
		<div className="h-100 max-md:h-90 max-sm:h-75 flex items-center bg-[url('/bg.png')] bg-cover bg-center">
			<div className="container max-md:flex-col max-md:items-center flex justify-between ">
				<div className="max-md:flex max-md:flex-col max-md:justify-center">
					<button
						onClick={() => router.push("/persons")}
						className="font-medium max-md:w-84 max-sm:text-xs max-sm:py-4 max-md:mx-auto px-6 py-3 bg-primary hover:bg-primary-dark transition rounded-3xl"
					>
						ВЫБРАТЬ ПСИХОЛОГА
					</button>
					<p className="text-4xl font-medium !mt-8 max-md:text-center max-md:text-2xl max-sm:text-xl">КАБИНЕТ ПСИХОЛОГА</p>
					<p className="text-[52px] font-medium text-primary-dark max-md:text-4xl max-sm:text-[28px] max-md:text-center max-md:!mt-2 max-md:!mb-4">
						НАТАЛЬИ НАУМОВОЙ
					</p>
				</div>
				<div>
					<div className="flex gap-4.5 items-center w-fit px-8 py-5 max-lg:px-5 max-lg:py-4 bg-white rounded-3xl border border-gray-200">
						<img className="max-lg:w-20" src={"./yandex.svg"} alt="" />
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
					<button  onClick={() => router.push("/persons")} className="max-md:hidden font-medium mt-8 px-21 py-3 bg-primary hover:bg-primary-dark transition rounded-3xl">
						ВЫБРАТЬ ПСИХОЛОГА
					</button>
				</div>
			</div>
		</div>
	);
}

export default BaseMain;
