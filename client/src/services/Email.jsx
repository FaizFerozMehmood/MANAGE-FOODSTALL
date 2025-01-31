import { useState } from "react";
import axios from "axios";
import { url } from "./ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  toast.success("Email has been sent successfully!")
      setResponse(res.data.message);
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setResponse("Failed to send email.");
      toast.error("Failed to send email.")
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    // backgroundColor:"red  "
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <p style={{ fontSize:"20px" ,maxWidth: "400px", textAlign: "center", marginBottom: "20px", color: "#555" }}>
        Fill out the form below to send an email to any Branch user.😍
      </p>
      <form onSubmit={sendEmail} style={formStyle}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Send Email</h2>
        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ ...inputStyle, height: "100px" }}
        />
        <button type="submit" style={loading ? buttonDisabledStyle : buttonStyle} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        {/* {response && <p style={{ textAlign: "center", color: response.includes("Failed") ? "red" : "green" }}>{response}</p>} */}
      </form>
      <ToastContainer/>
    </div>
  );
};

export default EmailForm;