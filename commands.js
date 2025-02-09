const axios = require("axios");
const { ORDERKUOTA_API, API_KEY } = require("./config");

module.exports = {
    cekSaldo: async (bot, chatId, userId) => {
        try {
            const response = await axios.get(`${ORDERKUOTA_API}/cek-saldo?apiKey=${API_KEY}&userId=${userId}`);
            const saldo = response.data.saldo;
            bot.sendMessage(chatId, `💰 *Saldo Anda:* Rp ${saldo}`, { parse_mode: "Markdown" });
        } catch (error) {
            bot.sendMessage(chatId, "❌ Gagal mengambil saldo.");
        }
    },

    cekHistori: async (bot, chatId, userId) => {
        try {
            const response = await axios.get(`${ORDERKUOTA_API}/transaksi?apiKey=${API_KEY}&userId=${userId}`);
            const transaksi = response.data.transaksi.map(trx => `🔹 ${trx.tanggal}: ${trx.jenis} - Rp${trx.jumlah}`).join("\n");
            bot.sendMessage(chatId, `📜 *Histori Transaksi:*\n\n${transaksi}`, { parse_mode: "Markdown" });
        } catch (error) {
            bot.sendMessage(chatId, "❌ Gagal mengambil data transaksi.");
        }
    }
};