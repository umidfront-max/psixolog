"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IMaskInput } from "react-imask";
import { Clock } from "lucide-react";
import Calendar from "react-calendar";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalContent({ isOpen, onClose }: ModalProps) {
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const times = ["10:00", "11:30", "13:00", "15:00", "16:30", "18:00"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm h-full bg-white p-6 overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 mb-4"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full border rounded-3xl border-gray-300">
                <img
                  src={"/bn.png"}
                  alt="Наталья Наумова"
                  className="h-96 object-cover rounded-3xl w-full"
                />
                <div className="mt-4 mb-6 px-6">
                  <h2 className="text-2xl font-medium text-primary-dark">
                    НАТАЛЬЯ НАУМОВА
                  </h2>
                  <p className="text-gray-600">
                    Психолог, детский нейропсихолог
                  </p>
                </div>
              </div>

              {/* Calendar */}
              <div className="w-full p-4 bg-white shadow rounded-xl">
                <Calendar
                  value={date}
                  onChange={(val) => setDate(val as Date)}
                  locale="ru-RU"
                />
                <div className="flex justify-between border-t pt-4 border-gray-200 mt-4">
                  <button className="bg-primary text-white px-4 py-2 rounded-3xl hover:bg-primary-dark text-sm font-medium">
                    В КАБИНЕТЕ
                  </button>
                  <button className="bg-gray-100 px-4 py-2 rounded-3xl hover:bg-gray-200 text-sm font-medium">
                    ОНЛАЙН
                  </button>
                </div>
              </div>

              {/* Time slots */}
              <div className="w-full max-w-sm mx-auto bg-white rounded-3xl border border-gray-200 p-6 space-y-6">
                <h2 className="font-medium text-gray-700">ВЫБЕРИТЕ ВРЕМЯ</h2>
                <div className="grid grid-cols-2 gap-3">
                  {times.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition ${
                        time === t
                          ? "bg-sky-400 text-white border-sky-400"
                          : "bg-white text-gray-600 border-gray-300 hover:border-sky-300"
                      }`}
                    >
                      <Clock size={16} />
                      <span className="text-sm">{t}</span>
                    </button>
                  ))}
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Имя*"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <IMaskInput
                    mask="+7 (000) 000-00-00"
                    placeholder="+7 (___) ___-__-__"
                    lazy={false}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <input
                    type="text"
                    placeholder="Код из SMS*"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <button className="w-full bg-sky-400 hover:bg-sky-500 text-white py-3 rounded-xl font-semibold transition">
                  ПОЛУЧИТЬ КОД
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
