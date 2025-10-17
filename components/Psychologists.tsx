"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Specialist {
  specialist_id: number;
  name: string;
  photo: string;
  base_price: number;
  short_description: string;
}

export default function Psychologists() {
  const router = useRouter();
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecialists() {
      try {
        const res = await fetch("https://xn--80agomhibes5b3a.xn--p1ai/specialist/");
        if (!res.ok) throw new Error("API xatosi");
        const data = await res.json();
        setSpecialists(data);
      } catch (err) {
        console.error("Xato:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSpecialists();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container text-center text-xl">Yuklanmoqda...</div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-4xl font-medium max-md:text-2xl mb-6">НАШИ ПСИХОЛОГИ</h2>

        <div className="grid max-[900px]:grid-cols-2 max-sm:grid-cols-1 grid-cols-3 gap-8 max-lg:gap-5">
          {specialists.map((p) => {
            // Rasm URL’ini to‘g‘ri ko‘rsatish (ba’zilar static\\img... bo‘lishi mumkin)
            const imgUrl = p.photo.startsWith("http")
              ? p.photo
              : `https://xn--80agomhibes5b3a.xn--p1ai/${p.photo.replace(/\\/g, "/")}`;

            return (
              <div key={p.specialist_id} className="rounded-2xl flex flex-col">
                <div className="w-full h-90 mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={imgUrl}
                    alt={p.name}
                    width={360}
                    height={360}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-primary-dark font-medium text-2xl max-lg:text-base">
                      {p.name}
                    </h3>
                    <p className="text-gray-700 min-h-10 mt-1 mb-2 text-xl max-lg:text-base">
                      {p.short_description || "Психолог"}
                    </p>

                    <p
                      onClick={() => router.push(`/psixolog?id=${p.specialist_id}`)}
                      className="text-primary-dark cursor-pointer inline-block hover:no-underline !my-5 !mt-4 max-lg:text-sm max-sm:!my-2 max-sm:!mb-3"
                    >
                      ПОДРОБНЕЕ...
                    </p>

                    <div className="border-t border-gray-200 pt-4 px-6 max-xl:px-0">
                      <div className="font-medium text-lg max-sm:text-center">
                        <span className="border-r inline-block pr-6 border-gray-200">
                          Прием психолога{" "}
                        </span>
                        <span className="text-primary-dark pl-6 font-medium text-3xl max-lg:text-lg">
                          {p.base_price}{" "}
                          <span className="text-sm uppercase max-lg:text-xs">руб.</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/calendar?id="+p.specialist_id)}
                    className="w-full mt-3 bg-primary hover:bg-primary-dark hover:text-white font-medium py-2 px-6 max-sm:py-4 max-sm:!mt-6 rounded-full transition"
                  >
                    ЗАПИСАТЬСЯ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
