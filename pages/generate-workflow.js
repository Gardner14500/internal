import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { vertex } = req.body;

  if (!vertex) {
    return res.status(400).json({ message: "Missing vertex parameter" });
  }

  try {
    const prompt = `Create a detailed compliance workflow for this vertex: ${vertex}`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const workflow = completion.data.choices[0].message.content;
    res.status(200).json({ workflow });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
}
