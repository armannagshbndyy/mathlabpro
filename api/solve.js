import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { prompt } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "تو یک دستیار ریاضی هستی و ساده توضیح می‌دهی." },
      { role: "user", content: prompt }
    ]
  });

  res.status(200).json({
    answer: completion.choices[0].message.content
  });
}
