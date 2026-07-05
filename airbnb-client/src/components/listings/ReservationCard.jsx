import { FaStar } from "react-icons/fa";

import useAuth from "../../context/useAuth";
import useLocale from "../../context/useLocale";

import "./ReservationCard.css";

// Format YYYY-MM-DD as a readable US date string
const formatDisplayDate = (dateValue) => {
    if (!dateValue) return "";
    return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-US");
};

// Sticky booking widget on the room details page
const ReservationCard = ({
    listing,
    checkIn,
    checkOut,
    guestCount,
    onCheckInChange,
    onCheckOutChange,
    onGuestCountChange,
    onReserve,
    loading,
}) => {
    const { token } = useAuth();
    const { t, formatPrice } = useLocale();

    // Number of nights between check-in and check-out
    const nights =
        checkIn && checkOut
            ? Math.max(
                  0,
                  (new Date(`${checkOut}T00:00:00`) -
                      new Date(`${checkIn}T00:00:00`)) /
                      (1000 * 60 * 60 * 24)
              )
            : 0;

    // Price breakdown — fees fall back to defaults when not on the listing
    const nightlyRate = listing.price || 0;
    const subtotal = nights * nightlyRate;
    const listingWeeklyDiscount = listing.weeklyDiscount ?? 0;
    const weeklyDiscount =
        nights >= 7 ? listingWeeklyDiscount : 0;
    const cleaningFee = listing.cleaningFee ?? 50;
    const serviceFee = listing.serviceFee ?? 50;
    const occupancyTaxes = listing.occupancyTaxes ?? 30;
    const total =
        subtotal - weeklyDiscount + cleaningFee + serviceFee + occupancyTaxes;

    const hasDates = nights > 0;

    const rating = listing.rating || 5.0;
    const reviewCount = listing.reviews || 7;

    // Require login before calling the parent's onReserve handler
    const handleReserve = () => {
        if (!token) {
            alert("Please log in to make a reservation.");
            return;
        }

        onReserve();
    };

    return (
        <div className="reservation-card">
            {/* Nightly price and star rating */}
            <div className="reservation-card__header">
                <p className="reservation-card__price">
                    <span>{formatPrice(nightlyRate)}</span> {t("perNight")}
                </p>

                <div className="reservation-card__rating">
                    <FaStar />
                    <span>{rating.toFixed(1)}</span>
                    <button type="button" className="reservation-card__reviews">
                        {reviewCount} {t("reviews")}
                    </button>
                </div>
            </div>

            {/* Check-in, check-out, and guest count inputs */}
            <div className="reservation-card__fields">
                <div className="reservation-card__field">
                    <label htmlFor="check-in">CHECK-IN</label>
                    <input
                        id="check-in"
                        type="date"
                        value={checkIn}
                        onChange={(event) =>
                            onCheckInChange(event.target.value)
                        }
                    />
                </div>

                <div className="reservation-card__field">
                    <label htmlFor="check-out">CHECKOUT</label>
                    <input
                        id="check-out"
                        type="date"
                        value={checkOut}
                        min={checkIn || undefined}
                        onChange={(event) =>
                            onCheckOutChange(event.target.value)
                        }
                    />
                </div>

                <div className="reservation-card__field reservation-card__field--guests">
                    <label htmlFor="guests">GUESTS</label>
                    <select
                        id="guests"
                        value={guestCount}
                        onChange={(event) =>
                            onGuestCountChange(Number(event.target.value))
                        }
                    >
                        {Array.from(
                            { length: listing.guests || 8 },
                            (_, index) => index + 1
                        ).map((count) => (
                            <option key={count} value={count}>
                                {count} guest{count > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="button"
                className="reservation-card__reserve"
                onClick={handleReserve}
                disabled={loading}
            >
                {loading ? "Reserving..." : "Reserve"}
            </button>

            <p className="reservation-card__note">
                You won&apos;t be charged yet
            </p>

                {/* Itemized costs — shows $0 until dates are selected */}
                <div className="reservation-card__breakdown">
                    <div className="reservation-card__line">
                        <span>
                        {formatPrice(nightlyRate)} x {nights}{" "}
                        {nights === 1 ? t("night") : t("nights")}
                        </span>
                        <span>{formatPrice(hasDates ? subtotal : 0)}</span>
                    </div>

                    <div className={`reservation-card__line${ weeklyDiscount > 0 ? " reservation-card__line--discount" : "" }`}>
                        <span>{t("weeklyDiscount")}</span>
                        <span>
                            {weeklyDiscount > 0
                                ? `-${formatPrice(weeklyDiscount)}`
                                : formatPrice(0)}
                        </span>
                    </div>

                    <div className="reservation-card__line">
                        <span>{t("cleaningFee")}</span>
                        <span>
                            {hasDates ? formatPrice(cleaningFee) : formatPrice(0)}
                        </span>
                    </div>

                    <div className="reservation-card__line">
                        <span>{t("serviceFee")}</span>
                        <span>
                            {hasDates ? formatPrice(serviceFee) : formatPrice(0)}
                        </span>
                    </div>

                    <div className="reservation-card__line">
                        <span>{t("occupancyTaxes")}</span>
                        <span>
                            {hasDates
                                ? formatPrice(occupancyTaxes)
                                : formatPrice(0)}
                        </span>
                    </div>

                    <div className="reservation-card__total">
                        <span>{t("total")}</span>
                        <span>{formatPrice(hasDates ? total : 0)}</span>
                    </div>
                </div>

            {/* Human-readable date range below the breakdown */}
            {(checkIn || checkOut) && (
                <p className="reservation-card__selected-dates">
                    {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
                </p>
            )}
        </div>
    );
};

export default ReservationCard;
