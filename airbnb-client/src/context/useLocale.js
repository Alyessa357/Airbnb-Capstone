import { useContext } from "react";
import { LocaleContext } from "./LocaleContext";

// Shortcut hook — returns language, currency, t, and formatPrice from LocaleContext
const useLocale = () => {
    return useContext(LocaleContext);
};

export default useLocale;
