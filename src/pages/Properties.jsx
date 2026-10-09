
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { properties } from "../data/properties";

function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setLocation(searchParams.get("location") || "");
    setType(searchParams.get("type") || "");
    setBedrooms(searchParams.get("bedrooms") || "");
    setPrice(searchParams.get("price") || "");
  }, [searchParams]);

  const filteredProperties = properties.filter((property) => {
    const searchLocation = location.trim().toLowerCase();

    const locationMatch =
      !searchLocation ||
      property.location?.toLowerCase().includes(searchLocation) ||
      property.title?.toLowerCase().includes(searchLocation);

    const typeMatch = !type || property.type === type;

    const bedroomMatch =
      !bedrooms || Number(property.beds) >= Number(bedrooms);

    const amount = Number(property.price);
    let priceMatch = true;

    if (price === "under50") {
      priceMatch = amount < 5000000;
    } else if (price === "50to100") {
      priceMatch = amount >= 5000000 && amount <= 10000000;
    } else if (price === "above100") {
      priceMatch = amount > 10000000;
    }

    return locationMatch && typeMatch && bedroomMatch && priceMatch;
  });

  const handleSearch = (event) => {
    event.preventDefault();

    const params = {};

    if (location.trim()) params.location = location.trim();
    if (type) params.type = type;
    if (bedrooms) params.bedrooms = bedrooms;
    if (price) params.price = price;

    setSearchParams(params);
  };

  const handleReset = () => {
    setLocation("");
    setType("");
    setBedrooms("");
    setPrice("");
    setSearchParams({});
  };

  return (
    <div className="properties-page">
      <section className="page-header">
        <div className="container">
          <p className="section-label">OUR PROPERTIES</p>
          <h1>Find Your Perfect Property</h1>
          <p>Explore our collection of premium properties.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="filters" onSubmit={handleSearch}>
            <div className="filter-item">
              <label htmlFor="filter-location">Location</label>
              <input
                id="filter-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Search location"
              />
            </div>

            <div className="filter-item">
              <label htmlFor="filter-type">Property Type</label>
              <select
                id="filter-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
              </select>
            </div>

            <div className="filter-item">
              <label htmlFor="filter-bedrooms">Bedrooms</label>
              <select
                id="filter-bedrooms"
                value={bedrooms}
                onChange={(event) => setBedrooms(event.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="filter-item">
              <label htmlFor="filter-price">Price</label>
              <select
                id="filter-price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              >
                <option value="">Any Price</option>
                <option value="under50">Under ₹50 Lakh</option>
                <option value="50to100">₹50 Lakh - ₹1 Cr</option>
                <option value="above100">Above ₹1 Cr</option>
              </select>
            </div>

            <button type="submit" className="filter-button">
              Search
            </button>
          </form>

          <div className="results-header">
            <h2>{filteredProperties.length} Properties Found</h2>
            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Reset Filters
            </button>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <article className="property-card" key={property.id}>
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                    <span className="property-tag">{property.type}</span>
                  </div>

                  <div className="property-content">
                    <h3>{property.title}</h3>
                    <p className="property-location">
                      📍 {property.location}
                    </p>

                    <div className="property-info">
                      <span>🛏 {property.beds} Beds</span>
                      <span>🛁 {property.baths} Baths</span>
                      <span>📐 {property.area}</span>
                    </div>

                    <div className="property-bottom">
                      <strong>{property.priceText}</strong>
                      <Link to={`/property/${property.id}`}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No properties found</h3>
              <p>Try changing your search or filter options.</p>
              <button
                type="button"
                className="primary-btn"
                onClick={handleReset}
              >
                View All Properties
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Properties;