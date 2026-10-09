import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";

function Home() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (type) {
      params.set("type", type);
    }

    if (price) {
      params.set("price", price);
    }

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <p className="hero-small-title">FIND YOUR DREAM HOME</p>

          <h1>
            Discover a place
            <br />
            you can call <span>home.</span>
          </h1>

          <p className="hero-description">
            Explore premium properties and find the perfect home
            for you and your family.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <div className="search-field">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter city or location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label>Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
              </select>
            </div>

            <div className="search-field">
              <label>Price</label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="under50">Under ₹50 Lakh</option>
                <option value="50to100">₹50 Lakh - ₹1 Cr</option>
                <option value="above100">Above ₹1 Cr</option>
              </select>
            </div>

            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-label">FEATURED PROPERTIES</p>

              <h2>
                Explore our latest
                <br />
                properties
              </h2>
            </div>

            <Link to="/properties" className="view-all">
              View All Properties →
            </Link>
          </div>

          <div className="property-grid">
            {properties.slice(0, 3).map((property) => (
              <div className="property-card" key={property.id}>
                <div className="property-image">
                  <img
                    src={property.image}
                    alt={property.title}
                  />

                  <span className="property-tag">
                    {property.type}
                  </span>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="section-heading center">
            <p className="section-label">WHY CHOOSE US</p>

            <h2>
              Everything you need to
              <br />
              find your perfect home
            </h2>
          </div>

          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>

              <h3>Wide Range of Properties</h3>

              <p>
                Choose from thousands of verified properties
                across different locations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>

              <h3>Easy Property Search</h3>

              <p>
                Find your ideal property quickly using our
                advanced search and filters.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>

              <h3>Trusted Agents</h3>

              <p>
                Connect with professional and experienced
                real estate agents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;