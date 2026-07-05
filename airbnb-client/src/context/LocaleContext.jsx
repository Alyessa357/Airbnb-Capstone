import { createContext, useEffect, useState } from "react";

const CURRENCY_RATES = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
};

const CURRENCY_LOCALES = {
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
};

const translations = {
    en: {
        perNight: "/ night",
        night: "night",
        nights: "nights",
        weeklyDiscount: "Weekly discount",
        cleaningFee: "Cleaning fee",
        serviceFee: "Service fee",
        occupancyTaxes: "Occupancy taxes and fees",
        total: "Total",
        reviews: "reviews",
    },
    es: {
        perNight: "/ noche",
        night: "noche",
        nights: "noches",
        weeklyDiscount: "Descuento semanal",
        cleaningFee: "Tarifa de limpieza",
        serviceFee: "Tarifa de servicio",
        occupancyTaxes: "Impuestos y tasas",
        total: "Total",
        reviews: "reseñas",
    },
    fr: {
        perNight: "/ nuit",
        night: "nuit",
        nights: "nuits",
        weeklyDiscount: "Réduction hebdomadaire",
        cleaningFee: "Frais de ménage",
        serviceFee: "Frais de service",
        occupancyTaxes: "Taxes et frais",
        total: "Total",
        reviews: "avis",
    },
};

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        () => localStorage.getItem("language") || "en"
    );
    const [currency, setCurrency] = useState(
        () => localStorage.getItem("currency") || "USD"
    );

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    const t = (key) => translations[language]?.[key] ?? translations.en[key] ?? key;

    const formatPrice = (amountInUsd) => {
        const converted = amountInUsd * CURRENCY_RATES[currency];
        return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(converted);
    };

    return (
        <LocaleContext.Provider
            value={{
                language,
                setLanguage,
                currency,
                setCurrency,
                t,
                formatPrice,
            }}
        >
            {children}
        </LocaleContext.Provider>
    );
};
