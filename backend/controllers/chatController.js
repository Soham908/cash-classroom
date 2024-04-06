const dotenv = require("dotenv");

dotenv.config({ path: "./../.env" });

exports.getResponse = async (req, res) => {
	try {
		let history = req.body.history;
		// console.log(history);
		// if (history[history.length - 1].role === "user") {
		// 	history[history.length - 1] = {
		// 		role: "model",
		// 		parts: [{ text: history[history.length - 1].parts[0].text }],
		// 	};
		// }

		const { GoogleGenerativeAI } = require("@google/generative-ai");
		const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const chat = model.startChat({
			history: history,
			generationConfig: {
				maxOutputTokens: 1024,
			},
		});

		const result = await chat.sendMessage(req.body.prompt);
		const response = await result.response;
		const text = response.text();
		console.log(text);
		res.json({
			success: true,
			text,
		});
		// console.log(req.body);
	} catch (err) {
		if (err?.response?.promptFeedback?.blockReason === "SAFETY") {
			console.log("SafetyReasons");
			res.json({
				success: false,
				message: "Safety Reasons",
			});
		} else {
			res.json({
				err,
				success: false,
			});
		}
	}
};
