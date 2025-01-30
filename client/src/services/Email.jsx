import { useState } from "react";
import axios from "axios";
import { url } from "./ApiRoutes";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);  

    try {
      const res = await axios.post(url.sendEmail, {
        to: email,
        subject,
        text: message,
      });

      setResponse(res.data.message);
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setResponse("Failed to send email.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form onSubmit={sendEmail}>
        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default EmailForm;
