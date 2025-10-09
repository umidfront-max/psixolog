// components/WhyChooseUs.tsx
export default function WhyChooseUs() {
	return (
		<section className="container mx-auto px-4 !py-12">
			<h2 className="max-md:text-2xl max-sm:text-xl max-sm:text-center text-4xl font-medium text-sky-600 mb-10 max-md:mb-6">
				ПОЧЕМУ ВЫБИРАЮТ НАС
			</h2>

			<div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
				{/* Chap tomondagi 2 ta card ustma-ust */}
				<div className="grid grid-cols-2 max-lg:grid-cols-1  gap-6">
					<div className="bg-[#9E98D7] rounded-lg shadow-md p-6 transition hover:shadow-lg">
						<h3 className="text-2xl font-medium mb-3 max-xl:text-xl max-md:text-sm">
							КОМПЛЕКСНЫЙ ПОДХОД К РЕШЕНИЮ ИМЕЮЩИХСЯ ПРОБЛЕМ
						</h3>
						<p className="text-gray-700  leading-relaxed max-md:text-[13px]">
							Мы используем междисциплинарный, комплексный подход к
							решению имеющихся проблем ребенка, взрослых и семьи в
							целом. Это позволяет максимально точно выявить первопричину
							проблемы и решить её в кратчайшие сроки.
						</p>
					</div>

					<div className="bg-[#FFC3C3] rounded-lg shadow-md p-6 transition hover:shadow-lg">
						<h3 className="text-2xl font-medium mb-3 max-md:mt-0 max-xl:text-xl max-md:text-sm">
							ПРОФЕССИОНАЛЫ С МНОГОЛЕТНИМ СТАЖЕМ
						</h3>
						<p className="text-gray-700 leading-relaxed max-md:text-[13px]">
							У нас Вы отдаете судьбу Вашего ребенка в руки
							профессионалов с многолетним стажем. Нужно всегда помнить,
							что обращаясь к непонятному психологу, зачастую с целью
							сэкономить, Вы можете принести существенный вред психике и
							здоровью Вашего чада.
						</p>
					</div>
				</div>

				{/* O‘ng tomondagi 2 ta card (ustma-ust) */}
				<div className="grid grid-rows-2 gap-6">
					<div className="bg-[#1DCBEE] rounded-lg shadow-md p-6 transition hover:shadow-lg">
						<h3 className="text-2xl font-medium !my-4 max-lg:!mt-0 max-xl:text-xl max-md:text-sm">
							НАДЕЖНЫЙ РЕЗУЛЬТАТ
						</h3>
						<p className="text-gray-700 leading-relaxed max-md:text-[13px]">
							Вы получите надежный результат после прохождения курса
							терапии, если будете следовать всем рекомендациям
							психолога. Но нужно помнить, что «волшебной палочки» не
							существует и все зависит только от вас и вашей
							целеустремленности.
						</p>
					</div>

					<div className="bg-[#31C4CE] rounded-lg shadow-md p-6 transition hover:shadow-lg">
						<h3 className="text-2xl font-medium !my-4 max-xl:text-xl max-lg:!mt-0 max-md:text-sm">
							АНОНИМНОСТЬ И КОНФИДЕНЦИАЛЬНОСТЬ
						</h3>
						<p className="text-gray-700 leading-relaxed max-md:text-[13px]">
							Мы обеспечиваем анонимность и конфиденциальность.
							Информация о Вашем ребенке и о Вас никому и никогда не
							будет передана без Вашего согласия.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
