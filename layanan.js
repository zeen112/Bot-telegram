const axios = require("axios");
const { ORDERKUOTA_API, API_KEY } = require("./config");

module.exports = {
    cekLayanan: async (bot, chatId) => {
        try {
            const response = await axios.get(`${ORDERKUOTA_API}/layanan?apiKey=${API_KEY}`);
            const layanan = response.data.layanan.map(l => `🔹 ${l.nama} - Rp${l.harga}`).join("\n");
            bot.sendMessage(chatId, `📋 *Layanan yang Tersedia:*\n\n${layanan}`, { parse_mode: "Markdown" });
        } catch (error) {
            bot.sendMessage(chatId, "❌ Gagal mengambil data layanan.");
        }
    }
};