import express from "express";
import cors from "cors";
import leadRoutes from "./routes/leads.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", leadRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});