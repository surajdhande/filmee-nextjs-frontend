"use client";

import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "react-day-picker/dist/style.css";

export default function DatePicker({
  value,
  onChange,
  label,
  required,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
  ref={calendarRef}
  className="relative flex flex-col gap-2"
>

      <label className="text-sm font-medium text-white">
        {label}
        {required && (
          <span className="ml-1 text-[#E50914]">*</span>
        )}
      </label>

      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex h-12 w-full items-center justify-between rounded-xl border border-[#303030] bg-[#1A1A1D] px-4 text-white transition-all duration-200 hover:border-[#E50914]"
      >
        <span>
          {value
            ? format(value, "d MMMM yyyy")
            : "Select Completion Date"}
        </span>

        <CalendarDays
          size={20}
          className="text-[#E50914]"
        />
      </button>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute top-20 z-50 rounded-2xl border border-[#303030] bg-[#161616] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.65)]"
          >
            <DayPicker
              mode="single"
              selected={value}
              onSelect={(date) => {
                if (!date) return;

                onChange(date);
                setShowCalendar(false);
              }}
              disabled={{
                before: new Date(),
              }}
              classNames={{
                months: "text-white",
                month_caption: "flex justify-center font-bold text-lg mb-4",
                weekdays: "flex justify-between text-gray-400",
                weekday: "w-10 text-center text-sm font-medium",
                week: "flex",
                day: "h-10 w-10 rounded-full text-white transition-all hover:bg-[#E50914] hover:text-white cursor-pointer",
                selected: "bg-[#E50914] text-white",
                today: "border border-[#E50914]",
                chevron: "text-[#E50914]",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}