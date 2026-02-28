const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;

    if (!symptoms) {
      return res.status(400).json({
        success: false,
        message: "Symptoms are required",
      });
    }

    // Prompt Engineering
    const prompt = `You are a professional Medical AI Assistant. 
Analyze these symptoms for a ${age} years old ${gender} patient: "${symptoms}".
Provide the response strictly in this format:
1. Possible Conditions: (List 3 points)
2. Risk Level: (Low, Medium, or High)
3. Recommended Tests: (List 2-3 tests)
4. Summary in Urdu: (2 lines for the patient)`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast & affordable model
      messages: [
        { role: "system", content: "You are a professional medical AI assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
    });

    const text = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      analysis: text,
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      success: false,
      message: "AI Service is temporarily down. Please proceed with manual diagnosis.",
      error: error.message,
    });
  }
};

module.exports = { analyzeSymptoms };