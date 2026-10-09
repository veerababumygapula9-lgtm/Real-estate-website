import { useState } from "react";

const contactEmail = "info@estatepro.com";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback("");

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMessage = message.trim();
    if (safeName.length < 2 || safeMessage.length < 10) {
      setFeedback("Please enter your name and a message of at least 10 characters.");
      return;
    }

    const subject = encodeURIComponent(`EstatePro contact request from ${safeName}`);
    const body = encodeURIComponent(`Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`);
    setFeedback("Your email draft is ready. In your email application, review it and press Send to contact the team.");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section contact-page">
      <div className="container">
        <div className="section-heading center">
          <p className="section-label">GET IN TOUCH</p>
          <h1>Contact us</h1>
          <p>Have questions about a property? Our team is here to help.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>Let's talk</h2>
            <p>Tell us what you are looking for and our team can help you explore your options.</p>
            <div className="contact-item"><strong>📍 Address</strong><p>Hyderabad, Telangana, India</p></div>
            <div className="contact-item"><strong>📞 Phone</strong><p><a href="tel:+919876543210">+91 98765 43210</a></p></div>
            <div className="contact-item"><strong>✉️ Email</strong><p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p></div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" autoComplete="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required />

            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" autoComplete="email" placeholder="Your email" value={email} onChange={(event) => setEmail(event.target.value)} required />

            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" rows={6} placeholder="How can we help you?" value={message} onChange={(event) => setMessage(event.target.value)} minLength={10} required />

            <button type="submit" className="primary-btn">Prepare Email</button>
            {feedback && <p className="form-message form-message-success" role="status">{feedback}</p>}
            <p className="demo-notice">This frontend demo opens your email application. The message is only delivered after you press Send in that application. Automatic delivery requires a configured email service or backend.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
