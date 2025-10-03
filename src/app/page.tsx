import BaseMain from "../../components/BaseMain";
import Psychologists from "../../components/Psychologists";
import About from "../../components/About";
import Blog from "../../components/Blog";
import WhyChooseUs from "../../components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			<BaseMain />
			<Psychologists />
			<About />
			<Blog />
			<WhyChooseUs />
		
		</div>
	);
}
