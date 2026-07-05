import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/layout/Header";
import LocationFilters from "../components/listings/LocationFilters";
import ListingCard from "../components/listings/ListingCard";
import listingService from "../services/listingService";
import Footer from "../components/layout/Footer";
import CopyrightFooter from "../components/layout/CopyrightFooter";

import "./LocationPage.css";

// Search results page — filters listings by city and guest count from URL params
const LocationPage = () => {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);

    const [searchParams] = useSearchParams();

    const city = searchParams.get("city");
    const guestsParam = searchParams.get("guests");

    // Refetch and filter by city when the URL city param changes
    useEffect(() => {
        fetchListings();
    }, [city]);

    const fetchListings = async () => {
        try {
            const data = await listingService.getListings();
            let results = data.listings;

            if (city) {
                results = results.filter((listing) =>
                    listing.location
                        .toLowerCase()
                        .includes(city.toLowerCase())
                );
            }

            setListings(results);
            setFilteredListings(results);
        } catch (error) {
            console.log(error);
        }
    };

    // Further filter by minimum guest count when guests param is present
    useEffect(() => {
        let results = [...listings];

        if (guestsParam) {
            results = results.filter(
                (listing) =>
                    listing.guests >= Number(guestsParam)
            );
        }

        setFilteredListings(results);
    }, [guestsParam, listings]);

    const locationLabel = city
        ? city.charAt(0).toUpperCase() + city.slice(1)
        : "all locations";
    const countLabel =
        filteredListings.length > 0
            ? `${filteredListings.length}+`
            : "0";

    return (
        <div className="location-page">
            <Header variant="results" />

            <main className="location-page__main">
                <p className="location-page__subtitle">
                    {countLabel} stays in {locationLabel}
                </p>

                <LocationFilters />

                <div className="location-page__listings">
                    {filteredListings.length === 0 ? (
                        <p className="location-page__empty">
                            No stays found. Try adjusting your search.
                        </p>
                    ) : (
                        filteredListings.map((listing) => (
                            <ListingCard
                                key={listing._id}
                                listing={listing}
                            />
                        ))
                    )}
                </div>
            </main>
            
            <Footer />
            <CopyrightFooter />
        </div>
    );
};

export default LocationPage;
