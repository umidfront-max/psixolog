// pages/calendar/[id].tsx
"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Clock } from "lucide-react";
import { IMaskInput } from "react-imask";
import toast from "react-hot-toast";

interface CalendarPageProps {
  initialCalendar: string[];
  specialistId: string;
}

export default function CalendarPage({ initialCalendar, specialistId }: CalendarPageProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [calendar, setCalendar] = useState<string[]>(initialCalendar);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [time, setTime] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    begin: formatDate1(new Date()),
    end: formatDate1(addMonths(new Date(), 3)),
    specialist_id: specialistId,
    online: false,
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);

  function formatDate1(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addMonths(date: Date, months: number) {
    const copy = new Date(date);
    copy.setMonth(copy.getMonth() + months);
    return copy;
  }

  // 🔹 Sana tanlanganda vaqt slotlarini olish
  const fetchTimeSlots = async (selectedDate: Date) => {
    try {
      const res = await fetch(
        "https://xn--80agomhibes5b3a.xn--p1ai/get_time_slot/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: formatDate1(selectedDate),
            online: formData.online,
            specialist_id: specialistId,
          }),
        }
      );
      if (!res.ok) throw new Error("Xato vaqt slotida");
      const data = await res.json();
      setTimeSlots(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendSMS = async () => {
    if (!name.trim()) {
      toast.error("Введите имя");
      return;
    }
    if (!phone) {
      toast.error("Введите номер телефона");
      return;
    }
    const cleanPhone = phone.replace(/[^\d+]/g, "");
    try {
      const res = await fetch(
        "https://xn--80agomhibes5b3a.xn--p1ai/validation_phone_number/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: cleanPhone }),
        }
      );
      if (!res.ok) throw new Error("Ошибка отправки SMS");
      setIsCodeSent(true);
      setTimer(60);
      toast.success("Код отправлен!");
    } catch {
      toast.error("Ошибка при отправке SMS");
    }
  };

  const sendAppointment = async () => {
    if (!smsCode) {
      toast.error("Введите код из SMS!");
      return;
    }

    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const payload = {
      phone: cleanPhone,
      timeslot_id: time?.id,
      description: "empty",
      code_validation: smsCode,
      name,
    };

    try {
      const res = await fetch(
        "https://xn--80agomhibes5b3a.xn--p1ai/appointment/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Ошибка при записи");
      toast.success("Вы успешно записались!");
    } catch {
      toast.error("Ошибка при создании записи!");
    }
  };

  // 🔹 Sana ostida nuqta
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formatted = formatDate1(date);
      if (calendar.includes(formatted)) {
        return (
          <div className="flex relative justify-center">
            <span className="w-2 h-2 absolute rounded-full bg-primary"></span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="container calendar !my-10">
      {/* Calendar */}
      <div className="w-full rounded-3xl px-50 py-10 bg-[#F4F4F440] max-lg:!px-10 max-sm:!px-1 max-sm:py-4 border border-gray-300">
        <Calendar
          className="!w-full h-100 !bg-transparent"
          value={date}
          onChange={(val) => {
            const newDate = val as Date;
            setDate(newDate);
            fetchTimeSlots(newDate);
          }}
          locale="ru-RU"
          tileContent={tileContent}
        />
        <div className="flex justify-between gap-4 border-t pt-4 border-gray-200 mt-4">
          <button
            onClick={() => setFormData({ ...formData, online: false })}
            className={`w-75 text-center px-4 py-2 rounded-3xl text-sm font-medium ${
              !formData.online
                ? "bg-primary text-white"
                : "bg-white border border-gray-400 hover:bg-gray-200"
            }`}
          >
            В КАБИНЕТЕ
          </button>
          <button
            onClick={() => setFormData({ ...formData, online: true })}
            className={`w-75 text-center px-4 py-2 rounded-3xl text-sm font-medium ${
              formData.online
                ? "bg-primary text-white"
                : "bg-white border border-gray-400 hover:bg-gray-200"
            }`}
          >
            ОНЛАЙН
          </button>
        </div>
      </div>

      {/* Time slots */}
      <div className="w-full rounded-3xl px-50 py-10 bg-[#F4F4F440] max-lg:!px-10 max-sm:!px-4 max-sm:py-5 border border-gray-300">
        <h2 className="font-medium text-gray-700 !mb-6">ВЫБЕРИТЕ ВРЕМЯ</h2>

        <div className="grid grid-cols-4 max-sm:grid-cols-3 max-[490px]:!grid-cols-2 gap-3">
          {timeSlots.length > 0 ? (
            timeSlots
              .filter((el) => el.free_time)
              .map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTime(t)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition ${
                    time === t
                      ? "bg-sky-400 text-white border-sky-400"
                      : "bg-white text-gray-600 border-gray-300 hover:border-sky-300"
                  }`}
                >
                  <Clock size={16} />
                  <span className="text-sm">{t.time?.substring(0, 5)}</span>
                </button>
              ))
          ) : (
            <p className="text-gray-500 text-center col-span-4">
              Свободного времени нет
            </p>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4 !mt-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя*"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <IMaskInput
            mask="+7 (000) 000-00-00"
            value={phone}
            onAccept={(val: string) => setPhone(val)}
            placeholder="+7 (___) ___-__-__"
            lazy={false}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          {isCodeSent && (
            <input
              type="text"
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value)}
              placeholder="Код из SMS*"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          )}
        </div>

        {/* Buttons */}
        {!isCodeSent ? (
          <button
            onClick={handleSendSMS}
            className="w-75 block !mx-auto !mt-10 bg-primary hover:bg-primary-dark text-white py-3 rounded-3xl font-medium transition"
          >
            ПОЛУЧИТЬ КОД
          </button>
        ) : (
          <div className="text-center !mt-8 space-y-3">
            {timer > 0 ? (
              <p className="text-gray-500 text-sm !mb-4">
                Отправить повторно через{" "}
                <span className="font-semibold">{timer}</span> сек
              </p>
            ) : (
              <button
                onClick={handleSendSMS}
                className="text-sky-500 text-sm underline hover:text-sky-600"
              >
                Отправить код повторно
              </button>
            )}

            <button
              onClick={sendAppointment}
              className="w-75 block !mx-auto bg-primary hover:bg-primary-dark text-white py-3 rounded-3xl font-medium transition"
            >
              ЗАПИСАТЬСЯ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 🔹 getStaticProps bilan server-side fetch va keshlash
export async function getStaticProps(context: any) {
  const id = context.params.id;

  function addMonths(date: Date, months: number) {
    const copy = new Date(date);
    copy.setMonth(copy.getMonth() + months);
    return copy;
  }

  try {
    const res = await fetch("https://xn--80agomhibes5b3a.xn--p1ai/get_freedate_list/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        begin: new Date().toISOString().split("T")[0],
        end: addMonths(new Date(), 3).toISOString().split("T")[0],
        specialist_id: id,
        online: false,
      }),
    });
    const initialCalendar = await res.json();

    return {
      props: { initialCalendar, specialistId: id },
      revalidate: 60, // ISR: 60s dan keyin yangilanadi
    };
  } catch (err) {
    return { props: { initialCalendar: [], specialistId: id } };
  }
}

// 🔹 getStaticPaths dynamic route uchun
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
