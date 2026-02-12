const express = require("express");
const app = express();
app.use(express.json());

app.get("/privacy", (req, res) => {
  res.send(`
    <h1>Privacy Policy - Devi Sarees Centre</h1>
    <p>We collect customer data only for order processing and communication via WhatsApp.</p>
    <p>We do not sell or share customer information.</p>
    <p>All communication is secured through WhatsApp Business Platform.</p>
    <p>Contact: +91 77948 45644</p>
  `);
});


// ✅ VERIFY WEBHOOK (THIS FIXES YOUR ERROR)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Receive Messages
app.post("/webhook", (req, res) => {
  const message =
    req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;

  let reply =
    "🌸 Welcome to Devi Sarees Centre 🌸\n\nReply:\n1️⃣ Sarees\n2️⃣ Jewellery\n3️⃣ Order";

  if (message === "1")
    reply = "🪷 Sarees:\n• Silk\n• Catalogue\n• Party Wear\n• Trendy";
  if (message === "2")
    reply =
      "💍 Jewellery:\n• Bangles\n• Necklace Sets\n• Jhumkas\n• Short Neck Sets";
  if (message === "3")
    reply = "🛍️ Please send:\nName\nAddress\nProduct Code";

  res.json({ text: { body: reply } });
});

app.get("/", (_, res) => res.send("Bot running"));
app.listen(3000);
