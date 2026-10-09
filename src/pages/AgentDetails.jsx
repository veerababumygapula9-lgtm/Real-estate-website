import { Link, useParams } from "react-router-dom";

function AgentDetails() {
  const { id } = useParams();

  const agents = {
    1: {
      name: "Rahul Sharma",
      role: "Senior Real Estate Agent",
      experience: "8 Years Experience",
      phone: "+91 98765 43210",
      email: "rahul@estatepro.com",
      location: "Hyderabad, Telangana",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
      about:
        "Rahul is an experienced real estate professional helping clients find premium residential properties in Hyderabad."
    },
    2: {
      name: "Priya Reddy",
      role: "Property Consultant",
      experience: "6 Years Experience",
      phone: "+91 98765 12345",
      email: "priya@estatepro.com",
      location: "Hyderabad, Telangana",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      about:
        "Priya specializes in residential properties and provides personalized guidance to buyers and sellers."
    }
  };

  const agent = agents[id];

  if (!agent) {
    return (
      <section className="section">
        <div className="container no-results">
          <h1>Agent Not Found</h1>

          <p>
            The requested agent does not exist.
          </p>

          <Link
            to="/properties"
            className="primary-btn"
          >
            Back to Properties
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section agent-page">
      <div className="container">
        <Link to="/properties" className="back-link">
          ← Back to Properties
        </Link>

        <div className="agent-details">
          <div className="agent-image">
            <img
              src={agent.image}
              alt={agent.name}
            />
          </div>

          <div className="agent-content">
            <p className="section-label">OUR AGENT</p>

            <h1>{agent.name}</h1>

            <h3>{agent.role}</h3>

            <p>{agent.about}</p>

            <div className="agent-info">
              <p>
                <strong>Experience:</strong>{" "}
                {agent.experience}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {agent.location}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {agent.phone}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {agent.email}
              </p>
            </div>

            <Link
              to="/contact"
              className="primary-btn"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgentDetails;