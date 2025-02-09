const TelegramBot = require("node-telegram-bot-api");
const { TELEGRAM_TOKEN } = require("./config");
const { cekSaldo, cekHistori } = require("./commands");
const { menuUtama } = require("./buttons");
const { getDepositMethods, processDeposit } = require("./deposit");
const { kirimLaporan } = require("./laporan");
const { cekLayanan } = require("./layanan");
require("./server"); // Menjalankan Express.js

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Selamat datang di *Bot LazysTopup*!\nPilih menu di bawah:", {
        parse_mode: "Markdown",
        ...menuUtama
    });
});

bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const user = query.from;
    const data = query.data;

    if (data === "cek_saldo") cekSaldo(bot, chatId, user.id);
    else if (data === "cek_histori") cekHistori(bot, chatId, user.id);
    else if (data === "deposit") getDepositMethods(bot, chatId);
    else if (data.startsWith("deposit_")) processDeposit(bot, chatId, data.split("_")[1]);
    else if (data === "cek_layanan") cekLayanan(bot, chatId);
    else if (data === "lapor_admin") kirimLaporan(bot, chatId, user);
});