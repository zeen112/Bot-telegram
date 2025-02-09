const axios = require("axios");
const { ORDERKUOTA_API, API_KEY } = require("./config");

module.exports = {
    getDepositMethods: async (bot, chatId) => {
        try {
            const response = await axios.get(`${ORDERKUOTA_API}/deposit/metode?apiKey=${API_KEY}`);
            const metodeList = response.data.metode;

            if (metodeList.length === 0) {
                bot.sendMessage(chatId, "❌ Tidak ada metode deposit tersedia saat ini.");
                return;
            }

            const keyboard = metodeList.map(metode => [{ text: metode.nama, callback_data: `deposit_${metode.id}` }]);

            bot.sendMessage(chatId, "Pilih metode deposit yang tersedia:", {
                reply_markup: { inline_keyboard: keyboard }
            });
        } catch (error) {
            bot.sendMessage(chatId, "❌ Gagal mengambil daftar metode deposit.");
        }
    },

    processDeposit: async (bot, chatId, metodeId) => {
        try {
            const response = await axios.get(`${ORDERKUOTA_API}/deposit/info?apiKey=${API_KEY}&metodeId=${metodeId}`);
            const metode = response.data;

            if (!metode || !metode.nomor) {
                bot.sendMessage(chatId, "❌ Gagal mendapatkan detail pembayaran.");
                return;
            }

            bot.sendMessage(chatId, `✅ Silakan lakukan transfer ke:\n\n🏦 ${metode.nama}\n📌 Nomor: ${metode.nomor}\n💳 Minimal: Rp ${metode.minimal}`);
        } catch (error) {
            bot.sendMessage(chatId, "❌ Gagal mendapatkan informasi deposit.");
        }
    }
};