const express = require("express");
const app = express();
app.use(express.json());

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
