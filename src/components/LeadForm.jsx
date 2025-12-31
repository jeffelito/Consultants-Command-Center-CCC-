import { useState } from "react";

export default function LeadForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    source: "Web"
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Submission failed");

      setMessage("Lead submitted successfully ✅");
      setForm({ fullName: "", email: "", company: "", source: "Web" });
    } catch (err) {
      setMessage("Error submitting lead ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="fullName"
        placeholder="Full Name"
        required
        value={form.fullName}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
      />

      <select name="source" value={form.source} onChange={handleChange}>
        <option value="Web">Web</option>
        <option value="Referral">Referral</option>
        <option value="LinkedIn">LinkedIn</option>
      </select>

      <button disabled={loading}>
        {loading ? "Submitting..." : "Submit Lead"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
