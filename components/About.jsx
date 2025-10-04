"use client";
import React from "react";
import { useRouter } from "next/navigation";

function About() {
	const router = useRouter();

	return (
		<div className="min-h-181 flex flex-col items-center justify-center bg-[url('/banner1.png')] bg-cover bg-center px-6">
			<div className="w-full container text-black flex justify-between">
				{/* Chap taraf - yordam kattalar uchun */}
				<div className="w-90">
					<h2 className="text-3xl font-medium mb-4">ПОМОЩЬ ВЗРОСЛЫМ:</h2>
					<ul className="space-y-3 flex flex-col justify-start">
						<li className="bg-white py-2 w- px-6 rounded-4xl leading-4.5 rounded-tl-lg rounded-bl-[50px]">
							У Вас кризис в отношениях? Развод? Нет взаимопонимания с
							супругом/супругой?
						</li>
						<li className="bg-white py-2 w- px-6 rounded-4xl leading-4.5 rounded-tl-lg rounded-bl-[50px] w-fit">
							Вы не уверены в собственных силах?
						</li>
						<li className="bg-white py-2 w- px-6 rounded-4xl leading-4.5 rounded-tl-lg rounded-bl-[50px] whitespace-nowrap w-fit">
							Вы попали в тупик?
						</li>
						<li className="bg-white py-2 w- px-6 rounded-4xl leading-4.5 rounded-tl-lg rounded-bl-[50px]">
							У Вас сложилась стрессовая ситуация?
						</li>
						<li className="bg-white py-2 w- px-6 rounded-4xl leading-4.5 rounded-tl-lg rounded-bl-[50px] w-fit">
							Вам сложно достигнуть цель? Вступить в брак? У Вас страх
							родить ребенка?
						</li>
					</ul>
				</div>

				{/* O‘ng taraf - yordam bolalar uchun */}
				<div className="w-91.5 flex flex-col justify-end">
					<h2 className="text-3xl font-medium mb-4">ПОМОЩЬ ДЕТЯМ:</h2>
					<ul className="space-y-3 flex flex-col justify-end items-end">
						<li className="bg-white py-2 w- px-6 rounded-4xl leading-4.5 rounded-tr-lg rounded-br-[50px]">
							У Вашего ребенка трудности в обучении?
						</li>
						<li className="bg-white py-2 w-fit px-6 rounded-4xl leading-4.5 rounded-tr-lg rounded-br-[50px]">
							У Вашего ребенка бывают истерики?
						</li>
						<li className="bg-white py-2 w-fit px-6 rounded-4xl leading-4.5 rounded-tr-lg rounded-br-[50px]">
							У Вашего ребенка тревога и страх?
						</li>
						<li className="bg-white py-2 w-fit px-6 rounded-4xl leading-4.5 rounded-tr-lg rounded-br-[50px]">
							У Вас сложилась стрессовая ситуация?
						</li>
						<li className="bg-white py-2 w-fit px-6 rounded-4xl leading-4.5 rounded-tr-lg rounded-br-[50px]">
							Вашему ребенку поставили диагноз аутизм, СДВГ или ЗПРР?
						</li>
						<li className="bg-white py-2 w-fit px-6 rounded-4xl leading-4.5 rounded-tr-lg rounded-br-[50px]">
							Ваш ребенок отстает в развитии?
						</li>
					</ul>
				</div>
			</div>
			<div className=" text-center w-full px-6">
				<p className="text-2xl font-medium !mb-6 !mt-30">
					ЕСЛИ НА ОДИН ИЛИ БОЛЕЕ ВОПРОСОВ ВЫ ОТВЕТИЛИ ДА, ТО НЕ ТЕРЯЙТЕ
					ДРАГОЦЕННОЕ ВРЕМЯ.
				</p>
				<button
					onClick={() => router.push("/persons")}
					className="bg-primary hover:bg-primary-dark hover:text-white transition px-6 py-3 rounded-full font-medium"
				>
					ЗАПИШИТЕСЬ ОНЛАЙН
				</button>
			</div>
			{/* Pastdagi CTA */}
		</div>
	);
}

export default About;
