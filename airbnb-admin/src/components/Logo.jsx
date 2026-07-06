import logoUrl from "../assets/logo.svg";

import "./Logo.css";

// Reusable Airbnb logo — color comes from parent via currentColor
const Logo = ({ className = "" }) => (
    <span
        className={`logo ${className}`.trim()}
        style={{
            WebkitMaskImage: `url(${logoUrl})`,
            maskImage: `url(${logoUrl})`,
        }}
        role="img"
        aria-label="Airbnb"
    />
);

export default Logo;
