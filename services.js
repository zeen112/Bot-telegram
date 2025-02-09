module.exports = {
    getLayanan: async (bot, chatId) => {
        try {
            const response = await axios.get(`${ORDERKUOTA_API}/layanan?apiKey=${API_KEY}`);
            const layanan = response.data.layanan;

            let pesan = "📋 *Daftar Layanan:*\n\n";
            layanan.forEach(l => {
                pesan += `🔹 *${l.nama}*\n📌 *ID:* ${l.id}\n💰 *Harga:* Rp ${l.harga}\n📂 *Kategori:* ${l.kategori}\n\n`;
            });

            bot.sendMessage(chatId, pesan, { parse_mode: "Markdown" });
        } catch (error) {
            bot.sendMessage(chatId, "❌ Gagal mengambil daftar layanan.");
        }
    },

    pesanLayanan: async (bot, chatId, userId, layananId) => {
        try {
            const response = await axios.post(`${ORDERKUOTA_API}/pesan`, {
                apiKey: API_KEY,
                userId: userId,
                layananId: layananId
            });

            bot.sendMessage(chatId, `✅ Pesanan berhasil! ID Pesanan: ${response.data.id_pesanan}`);
        } catch (error) {
            bot.sendMessage(chatId, "❌ Gagal melakukan pemesanan.");
        }
    }
};