import { FaStar } from "react-icons/fa";

import useAuth from "../../context/useAuth";

import "./ReservationCard.css";

const formatDisplayDate = (dateValue) => {
    if (!dateValue) return "";
    return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-US");
};

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
    reserveLabel = "Reserve",
    requireAuth = true,
}) => {
    const { token } = useAuth();

    const nights =
        checkIn && checkOut
            ? Math.max(
                  0,
                  (new Date(checkOut) - new Date(checkIn)) /
                      (1000 * 60 * 60 * 24)
              )
            : 0;

    const nightlyRate = listing.price || 0;
    const subtotal = nights * nightlyRate;
    const weeklyDiscount =
        nights >= 7 ? (listing.weeklyDiscount ?? 0) : 0;
    const cleaningFee = listing.cleaningFee ?? 50;
    const serviceFee = listing.serviceFee ?? 50;
    const occupancyTaxes = listing.occupancyTaxes ?? 30;
    const total =
        subtotal - weeklyDiscount + cleaningFee + serviceFee + occupancyTaxes;

    const rating = listing.rating || 5.0;
    const reviewCount = listing.reviews || 7;

    const handleReserve = () => {
        if (requireAuth && !token) {
            alert("Please log in to make a reservation.");
            return;
        }

        onReserve();
    };

    return (
        <div className="reservation-card">
            <div className="reservation-card__header">
                <p className="reservation-card__price">
                    <span>${nightlyRate}</span> / night
                </p>

                <div className="reservation-card__rating">
                    <FaStar />
                    <span>{rating.toFixed(1)}</span>
                    <button type="button" className="reservation-card__reviews">
                        {reviewCount} reviews
                    </button>
                </div>
            </div>

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
                {loading ? "Reserving..." : reserveLabel}
            </button>

            {requireAuth && (
                <p className="reservation-card__note">
                    You won&apos;t be charged yet
                </p>
            )}

            {nights > 0 && (
                <div className="reservation-card__breakdown">
                    <div className="reservation-card__line">
                        <span>
                            ${nightlyRate} x {nights} night
                            {nights > 1 ? "s" : ""}
                        </span>
                        <span>${subtotal}</span>
                    </div>

                    {weeklyDiscount > 0 && (
                        <div className="reservation-card__line reservation-card__line--discount">
                            <span>Weekly discount</span>
                            <span>-${weeklyDiscount}</span>
                        </div>
                    )}

                    <div className="reservation-card__line">
                        <span>Cleaning fee</span>
                        <span>${cleaningFee}</span>
                    </div>

                    <div className="reservation-card__line">
                        <span>Service fee</span>
                        <span>${serviceFee}</span>
                    </div>

                    <div className="reservation-card__line">
                        <span>Occupancy taxes and fees</span>
                        <span>${occupancyTaxes}</span>
                    </div>

                    <div className="reservation-card__total">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                </div>
            )}

            {(checkIn || checkOut) && (
                <p className="reservation-card__selected-dates">
                    {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
                </p>
            )}
        </div>
    );
};

export default ReservationCard;
