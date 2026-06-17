// imports
import express from "express";

// init express
const app = new express();
const port = 3001;

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!"
  });
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});