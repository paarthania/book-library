const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get all books
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Add a new book
router.post("/", async (req, res) => {
  const { name, author, publish_year, finished_reading_date, cover_url } =
    req.body;
  try {
    const result = await pool.query(
      "INSERT INTO books (name, author, publish_year, finished_reading_date, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, author, publish_year, finished_reading_date, cover_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Get count of all books
router.get("/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS count FROM books");
    res.json({ count: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Update a book
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, author, publish_year, finished_reading_date, cover_url } =
    req.body;
  try {
    const result = await pool.query(
      "UPDATE books SET name = $1, author = $2, publish_year = $3, finished_reading_date = $4, cover_url = $5 WHERE id = $6 RETURNING *",
      [name, author, publish_year, finished_reading_date, cover_url, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.status(204).send();
    } else {
      res.status(404).send("Book not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
