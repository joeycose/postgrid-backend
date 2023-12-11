// src/index.ts

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PostGrid } from "postgrid-node-client";
import { LetterApi } from "postgrid-node-client/build/letter";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Initialize the PostGrid client with your API keys.
const postGridClient = new PostGrid({
  mail: process.env.POSTGRID_MAIL_API_KEY,
  addr: process.env.POSTGRID_ADDR_API_KEY,
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("PostGrid Backend is running.");
});

// Route for Retrieving letter
app.get("/retrieve-letter/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await postGridClient.letter.get(id);
    res.json({ success: true, letter: response });
  } catch (error) {
    console.error("Error creating letter via PostGrid:", error);
    res.status(500).json({ success: false, message: error });
  }
});

// Route for Getting a list of Letters
app.get("/list-letters", async (req: Request, res: Response) => {
  try {
    const doc = await postGridClient.letter.list();
    res.json({ success: true, letter: doc });
  } catch (error) {
    console.error("Error creating letter via PostGrid:", error);
    res.status(500).json({ success: false, message: error });
  }
});

// Route to create a letter
app.post("/create-letter", async (req: Request, res: Response) => {
  try {
    const { description, to, from, pdf } = req.body;

    // Call the PostGrid API to create a letter
    const response = await postGridClient.letter.create({
      description: description,
      pdf: pdf, // PDF should be a URL or Base64 string according to PostGrid's API spec
      to: to,
      from: from,
    });

    res.json({ success: true, letter: response });
  } catch (error) {
    console.error("Error creating letter via PostGrid:", error);
    res.status(500).json({ success: false, message: error });
  }
});

// Define port and start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
