import { createContext, useEffect, useState } from "react";

// Exchange rates relative to USD
const CURRENCY_RATES = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
};

// Intl locale strings for each supported currency
const CURRENCY_LOCALES = {
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
};

// UI strings keyed by language code
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

// Shared language and currency state — consumed via useLocale hook
export const LocaleContext = createContext();

// Wraps the app and provides i18n + currency formatting
export const LocaleProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        () => localStorage.getItem("language") || "en"
    );
    const [currency, setCurrency] = useState(
        () => localStorage.getItem("currency") || "USD"
    );

    // Persist language choice and update the html lang attribute
    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    // Look up a translated string; falls back to English then the key itself
    const t = (key) => translations[language]?.[key] ?? translations.en[key] ?? key;

    // Convert a USD amount to the selected currency and format it
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
