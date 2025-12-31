import { db } from "../db/connection.js";

export const createLead = (req, res) => {
  const { fullName, email, company, source } = req.body;

  // Validation
  if (!fullName || !email || !source) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const sql = `
    INSERT INTO leads (full_name, email, company, source)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [fullName, email, company, source], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    // OPTIONAL: trigger automation hook (stub for now)
    // await triggerAutomation(result.insertId);

    return res.status(201).json({
      message: "Lead created successfully",
      leadId: result.insertId
    });
  });
};