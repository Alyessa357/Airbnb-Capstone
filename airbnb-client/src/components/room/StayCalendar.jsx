import { FaChevronLeft, FaChevronRight, FaKeyboard } from "react-icons/fa";

import "./StayCalendar.css";

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Builds an array of day numbers with null padding for empty cells
const buildMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let index = 0; index < firstDay; index += 1) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
        days.push(day);
    }

    return days;
};

// Heading and subtitle text based on whether dates are selected
const formatRangeLabel = (checkIn, checkOut, nights, location) => {
    if (!checkIn || !checkOut) {
        return {
            title: `${nights || 7} nights in ${location}`,
            subtitle: "Select check-in and checkout dates",
        };
    }

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);

    return {
        title: `${nights} nights in ${location}`,
        subtitle: `${start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })} - ${end.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })}`,
    };
};

// True when a day falls between check-in and check-out (inclusive)
const isInRange = (year, month, day, checkIn, checkOut) => {
    if (!checkIn || !checkOut || !day) return false;

    const current = new Date(year, month, day);
    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);

    return current >= start && current <= end;
};

// True when a day is the check-in or check-out date
const isRangeEdge = (year, month, day, checkIn, checkOut) => {
    if (!day) return false;

    const current = new Date(year, month, day).toDateString();
    const start = checkIn
        ? new Date(`${checkIn}T00:00:00`).toDateString()
        : null;
    const end = checkOut
        ? new Date(`${checkOut}T00:00:00`).toDateString()
        : null;

    return current === start || current === end;
};

// Two-month availability calendar synced with reservation dates
const StayCalendar = ({
    location,
    checkIn,
    checkOut,
    nights,
    onClearDates,
}) => {
    // Show the month of check-in, or default to Feb 2022
    const startMonth = checkIn ? new Date(`${checkIn}T00:00:00`) : new Date(2022, 1, 1);
    const monthOne = startMonth.getMonth();
    const yearOne = startMonth.getFullYear();
    const monthTwo = monthOne === 11 ? 0 : monthOne + 1;
    const yearTwo = monthOne === 11 ? yearOne + 1 : yearOne;

    const labels = formatRangeLabel(checkIn, checkOut, nights, location);

    const renderMonth = (year, month) => (
        <div key={`${year}-${month}`} className="stay-calendar__month">
            <h3>
                {MONTH_NAMES[month]} {year}
            </h3>

            <div className="stay-calendar__weekdays">
                {DAY_LABELS.map((label) => (
                    <span key={label}>{label}</span>
                ))}
            </div>

            <div className="stay-calendar__days">
                {buildMonthDays(year, month).map((day, index) => {
                    const inRange = isInRange(year, month, day, checkIn, checkOut);
                    const isEdge = isRangeEdge(year, month, day, checkIn, checkOut);

                    return (
                        <span
                            key={`${month}-${index}`}
                            className={[
                                "stay-calendar__day",
                                !day ? "stay-calendar__day--empty" : "",
                                inRange ? "stay-calendar__day--in-range" : "",
                                isEdge ? "stay-calendar__day--edge" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            {day || ""}
                        </span>
                    );
                })}
            </div>
        </div>
    );

    return (
        <section className="stay-calendar">
            <h2>{labels.title}</h2>
            <p className="stay-calendar__subtitle">{labels.subtitle}</p>

            {/* Month navigation — UI only, not wired yet */}
            <div className="stay-calendar__controls">
                <button type="button" aria-label="Previous month">
                    <FaChevronLeft />
                </button>
                <button type="button" aria-label="Next month">
                    <FaChevronRight />
                </button>
            </div>

            <div className="stay-calendar__months">
                {renderMonth(yearOne, monthOne)}
                {renderMonth(yearTwo, monthTwo)}
            </div>

            <div className="stay-calendar__footer">
                <button type="button" className="stay-calendar__keyboard">
                    <FaKeyboard />
                </button>
                <button
                    type="button"
                    className="stay-calendar__clear"
                    onClick={onClearDates}
                >
                    Clear dates
                </button>
            </div>
        </section>
    );
};

export default StayCalendar;
