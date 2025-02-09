module.exports = {
    menuUtama: {
        reply_markup: {
            inline_keyboard: [
                [{ text: "💰 Cek Saldo", callback_data: "cek_saldo" }],
                [{ text: "📜 Cek Histori", callback_data: "cek_histori" }],
                [{ text: "📥 Deposit Saldo", callback_data: "deposit" }],
                [{ text: "🛒 Lihat Layanan", callback_data: "lihat_layanan" }],
                [{ text: "🚨 Hubungi Admin", callback_data: "lapor_admin" }]
            ]
        }
    }
};