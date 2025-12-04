import express from "express";
import "./KING_admins.js";

const app = express();
app.get("/", (req, res) => res.send("Server Running"));

app.listen(3000);
