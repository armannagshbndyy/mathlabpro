import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "Method not allowed" });
  }

  const { question } = req.body;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "تو یک دستیار فارسی برای حل مسائل ریاضی، معادله، مشتق و محاسبات هستی."
        },
        { role: "user", content: question }
      ]
    });

    res.status(200).json({
      answer: completion.choices[0].message.content
    });

  } catch (e) {
    res.status(500).json({ answer: "خطا در پردازش سوال" });
  }
}
