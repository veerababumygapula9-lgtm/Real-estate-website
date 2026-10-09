import { Link, useParams } from "react-router-dom";
import { properties } from "../data/properties";

function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return (
      <section className="section">
        <div className="container no-results">
          <h1>Property Not Found</h1>

          <Link to="/properties" className="primary-btn">
            Back to Properties
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section details-page">
      <div className="container">
        <Link to="/properties" className="back-link">
          ← Back to Properties
        </Link>

        <div className="details-grid">
          <div className="details-image">
            <img
              src={property.image}
              alt={property.title}
            />
          </div>

          <div className="details-content">
            <span className="property-tag">
              {property.type}
            </span>

            <h1>{property.title}</h1>

            <p className="property-location">
              📍 {property.location}
            </p>

            <h2>{property.priceText}</h2>

            <div className="details-features">
              <div>
                <strong>{property.beds}</strong>
                <span>Bedrooms</span>
              </div>

              <div>
                <strong>{property.baths}</strong>
                <span>Bathrooms</span>
              </div>

              <div>
                <strong>{property.area}</strong>
                <span>Area</span>
              </div>
            </div>

            <h3>Property Description</h3>

            <p>{property.description}</p>

            <div className="details-actions">
              <Link
                to={`/agent/${property.agentId}`}
                className="primary-btn"
              >
                View Agent
              </Link>

              <Link
                to="/contact"
                className="secondary-btn"
              >
                Contact Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;