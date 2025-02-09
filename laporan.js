const { ADMIN_WA } = require("./config");

module.exports = {
    kirimLaporan: (bot, chatId, laporan) => {
        const waLink = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(laporan)}`;
        bot.sendMessage(chatId, `📞 Kirim laporan ke admin: [Klik di sini](${waLink})`, { parse_mode: "Markdown" });
    }
};