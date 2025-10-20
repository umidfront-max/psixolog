"use client";

import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("../../../components/ContactMap"), {
	ssr: false, // faqat clientda render bo‘ladi
});

export default function ContactPage() {
	return (
		<div>
			<ContactMap />
		</div>
	);
}
