// components/WhyChooseUs.tsx
export default function WhyChooseUs() {
	return (
		<section className="container mx-auto px-4 !py-12">
			<h2 className="text-2xl md:text-4xl font-medium text-sky-600 mb-10">
				ПОЧЕМУ ВЫБИРАЮТ НАС
			</h2>

			<div className="grid md:grid-cols-2 gap-6">
				{/* Chap tomondagi 2 ta card ustma-ust */}
				<div className="grid grid-cols-2  gap-6">
					<div className="bg-[#9E98D7] rounded-lg shadow-md p-6 transition hover:shadow-lg">
						<h3 className="text-2xl font-medium mb-3">
							КОМПЛЕКСНЫЙ ПОДХОД К РЕШЕНИЮ ИМЕЮЩИХСЯ ПРОБЛЕМ
						</h3>
						<p className="text-gray-700  leading-relaxed">
							Мы используем междисциплинарный, комплексный подход к
							решению имеющихся проблем ребенка, взрослых и семьи в
							целом. Это позволяет максимально точно выявить первопричину
							проблемы и решить её в кратчайшие сроки.
						</p>
					</div>

					<div className="bg-[#FFC3C3] rounded-lg shadow-md p-6 transition hover:shadow-lg">
						<h3 className="text-2xl font-medium mb-3">
							ПРОФЕССИОНАЛЫ С МНОГОЛЕТНИМ СТАЖЕМ
						</h3>
						<p className="text-gray-700 leading-relaxed">
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
						<h3 className="text-2xl font-medium my-4">
							НАДЕЖНЫЙ РЕЗУЛЬТАТ
						</h3>
						<p className="text-gray-700 leading-relaxed">
							Вы получите надежный результат после прохождения курса
							терапии, если будете следовать всем рекомендациям
							психолога. Но нужно помнить, что «волшебной палочки» не
							существует и все зависит только от вас и вашей
							целеустремленности.
						</p>
					</div>

					<div className="bg-[#31C4CE] rounded-lg shadow-md p-6 transition hover:shadow-lg">
						<h3 className="text-2xl font-medium my-4">
							АНОНИМНОСТЬ И КОНФИДЕНЦИАЛЬНОСТЬ
						</h3>
						<p className="text-gray-700 leading-relaxed">
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
