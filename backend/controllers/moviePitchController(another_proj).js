const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./../.env" });

exports.createBotReply = async (req, res) => {
	try {
		const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });

		const chat = model.startChat({
			history: [],
			generationConfig: {
				maxOutputTokens: 1024,
			},
		});

		const result = await chat.sendMessage(req.body.prompt);
		const response = await result.response;
		const text = response.text();
		console.log(text);
		console.log(response);
		res.json({
			success: true,
			text,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};
