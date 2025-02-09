const express = require("express");
const axios = require("axios");
const { BOT_URL } = require("./config");

const app = express();

app.get("/", (req, res) => {
    res.send("Bot is running...");
});

app.listen(3000, () => {
    console.log("✅ Server berjalan di port 3000");

    setInterval(() => {
        axios.get(BOT_URL).catch(err => console.log("⚠️ Anti-sleep gagal:", err.message));
    }, 5 * 60 * 1000); // Ping setiap 5 menit
});