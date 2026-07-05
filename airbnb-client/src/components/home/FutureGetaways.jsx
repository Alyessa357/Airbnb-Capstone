import { useState } from "react";
import "./FutureGetaways.css";

// Category tab labels for the getaways section
const TABS = [
  "Destinations for arts & culture",
  "Destinations for outdoor adventure",
  "Mountain cabins",
  "Beach destinations",
  "Popular destinations",
  "Unique Stays",
];

// Destination lists keyed by tab — each ends with a "show-more" entry
const TAB_CONTENT = {
  "Destinations for arts & culture": [
    { city: "Phoenix", region: "Arizona" },
    { city: "Hot Springs", region: "Arkansas" },
    { city: "Los Angeles", region: "California" },
    { city: "San Diego", region: "California" },
    { city: "San Francisco", region: "California" },
    { city: "Barcelona", region: "Catalonia" },
    { city: "Prague", region: "Czechia" },
    { city: "Washington", region: "District of Columbia" },
    { city: "Keswick", region: "England" },
    { city: "London", region: "England" },
    { city: "Scarborough", region: "England" },
    { type: "show-more" },
  ],
  "Destinations for outdoor adventure": [
    { city: "Moab", region: "Utah" },
    { city: "Boulder", region: "Colorado" },
    { city: "Bend", region: "Oregon" },
    { city: "Asheville", region: "North Carolina" },
    { city: "Flagstaff", region: "Arizona" },
    { city: "Banff", region: "Canada" },
    { city: "Queenstown", region: "New Zealand" },
    { city: "Chamonix", region: "France" },
    { city: "Interlaken", region: "Switzerland" },
    { city: "Cape Town", region: "South Africa" },
    { city: "Patagonia", region: "Chile" },
    { type: "show-more" },
  ],
  "Mountain cabins": [
    { city: "Aspen", region: "Colorado" },
    { city: "Lake Tahoe", region: "California" },
    { city: "Gatlinburg", region: "Tennessee" },
    { city: "Park City", region: "Utah" },
    { city: "Big Bear", region: "California" },
    { city: "Whistler", region: "Canada" },
    { city: "Zermatt", region: "Switzerland" },
    { city: "Telluride", region: "Colorado" },
    { city: "Drakensberg", region: "South Africa" },
    { city: "Blue Mountains", region: "Australia" },
    { city: "Hakuba", region: "Japan" },
    { type: "show-more" },
  ],
  "Beach destinations": [
    { city: "Miami", region: "Florida" },
    { city: "Malibu", region: "California" },
    { city: "Myrtle Beach", region: "South Carolina" },
    { city: "Honolulu", region: "Hawaii" },
    { city: "Cancún", region: "Mexico" },
    { city: "Bali", region: "Indonesia" },
    { city: "Phuket", region: "Thailand" },
    { city: "Maui", region: "Hawaii" },
    { city: "Ballito", region: "South Africa" },
    { city: "Santorini", region: "Greece" },
    { city: "Tulum", region: "Mexico" },
    { type: "show-more" },
  ],
  "Popular destinations": [
    { city: "New York", region: "New York" },
    { city: "Paris", region: "France" },
    { city: "Tokyo", region: "Japan" },
    { city: "London", region: "England" },
    { city: "Rome", region: "Italy" },
    { city: "Dubai", region: "United Arab Emirates" },
    { city: "Sydney", region: "Australia" },
    { city: "Amsterdam", region: "Netherlands" },
    { city: "Las Vegas", region: "Nevada" },
    { city: "Orlando", region: "Florida" },
    { city: "Singapore", region: "Singapore" },
    { type: "show-more" },
  ],
  "Unique Stays": [
    { city: "Treehouses", region: "Worldwide" },
    { city: "Castles", region: "Europe" },
    { city: "Yurts", region: "Worldwide" },
    { city: "Houseboats", region: "Worldwide" },
    { city: "Caves", region: "Worldwide" },
    { city: "Tiny homes", region: "Worldwide" },
    { city: "Domes", region: "Worldwide" },
    { city: "Windmills", region: "Netherlands" },
    { city: "Barns", region: "Countryside" },
    { city: "Lighthouses", region: "Coastal" },
    { city: "Riads", region: "Morocco" },
    { type: "show-more" },
  ],
};

// Tabbed section — category tabs switch the destination grid below
const FutureGetaways = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const items = TAB_CONTENT[activeTab];

  return (
    <section className="future-getaways">
      <h2>Inspiration for future getaways</h2>

      {/* Category tabs — clicking switches the active destination list */}
      <div className="future-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`future-tabs__btn${
              activeTab === tab ? " future-tabs__btn--active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid of city/region items for the active tab */}
      <div className="future-grid">
        {items.map((item, index) =>
          item.type === "show-more" ? (
            <span key="show-more" className="future-item future-item--more">
              Show more
            </span>
          ) : (
            <div key={`${item.city}-${index}`} className="future-item">
              <span className="future-item__city">{item.city}</span>
              <span className="future-item__region">{item.region}</span>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default FutureGetaways;
