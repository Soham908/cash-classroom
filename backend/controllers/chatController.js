const dotenv = require("dotenv");

dotenv.config({ path: "./../.env" });

exports.getResponse = async (req, res) => {
	try {
		const prompt = `This model is trained to answer financial queries in a financial context.
		 Please provide a financial query, and the model will respond accordingly, using concise text and only in text.
		 
		User Prompt : ${req.body.prompt}
		Answer :
		`;
		const { GoogleGenerativeAI } = require("@google/generative-ai");
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const chat = model.startChat({
			history: req.body.history,
			generationConfig: {
				maxOutputTokens: 1024,
			},
		});

		const result = await chat.sendMessage(prompt);
		const response = await result.response;
		const text = response.text();

		res.json({
			success: true,
			text,
		});
		// console.log(req.body);
	} catch (err) {
		res.json({
			success: false,
			err,
		});
	}
};
