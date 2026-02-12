const express = require("express");
const app = express();
const axios = require("axios");
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
app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    const message =
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text?.body;

    let reply =
      "🌸 Welcome to Devi Sarees Centre 🌸\n\nReply:\n1️⃣ Sarees\n2️⃣ Jewellery\n3️⃣ Order";

    if (text === "1") {
  await axios.post(
    `https://graph.facebook.com/v24.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: from,
      type: "image",
      image: {
        link: "https://i.postimg.cc/zBtPBTn5/vibrant_color_dola_silk_sarees_260nw_2623854933.webp",
        caption: "✨ Silk Sarees Collection ✨"
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.sendStatus(200);
}

    if (text === "2") {
  await axios.post(
    `https://graph.facebook.com/v24.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: from,
      type: "image",
      image: {
        link: "https://i.postimg.cc/DZjYZ1q3/Best_Jewellery_Designs_for_Silk_Sarees.jpg",
        caption: "💍 Jewellery Collection 💍"
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.sendStatus(200);
}


    if (text === "3")
      reply = "🛍️ Please send:\nName\nAddress\nProduct Code";

    await axios.post(
      `https://graph.facebook.com/v24.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        type: "text",
        text: { body: reply }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.sendStatus(500);
  }
});


app.get("/", (_, res) => res.send("Bot running"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
