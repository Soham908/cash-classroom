// 79e241a0dad1314f81be503ad11731c1871baed4

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
	TavilySearchAPIRetriever,
} = require("@langchain/community/retrievers/tavily_search_api");
// import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
// const { ConversationalRetrievalQAChain } = require("langchain/chains");
// const { initializeAgentExecutorWithOptions } = require("langchain/agents");
// import { SerpAPI, ChainTool } from "langchain/tools";
// import { Calculator } from "langchain/tools/calculator";

require("dotenv").config();

const model = new ChatGoogleGenerativeAI({
	modelName: "gemini-pro",
	maxOutputTokens: 2048,
});

// Batch and stream are also supported
const getResonse = async () => {
	const res = await model.invoke([
		[
			"human",
			"What would be a good company name for a company that makes colorful socks?",
		],
	]);
	console.log(res.content);
};

// getResonse();

const tst = async (prompt) => {
	try {
		const retriever = new TavilySearchAPIRetriever({
			k: 3,
		});

		const retrievedDocs = await retriever.getRelevantDocuments(prompt);
		const retrievedContext = retrievedDocs
			.map((el) => el.pageContent)
			.join("\n");

		const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const chat = model.startChat({
			history: [],
			generationConfig: {
				maxOutputTokens: 1024,
			},
		});
		const promptInput = `Answer the following questions as best you can. You have access to the following context .
	You have a context about the search query performed on the question .
 	If the question requires you to search the context and answer use it else just answer the question as your own. 
	IF you do not know the answer , just say i dont know.
	
	Context : ${retrievedContext}

	Question: {input}
	`;
		// console.log(promptInput);
		// const result = await chat.sendMessage("What is the electoral bonds scam");
		const result = await chat.sendMessage("Fuck you");
		const response = await result.response;
		const text = response.text();
		console.log(response);
		console.log("-----------------------------------------------------");
		console.log(response.candidates[0].content);
		// console.log(response.content);
		console.log("-----------------------------------------------------");
		console.log(response.candidates[0].safetyRatings);
	} catch (err) {
		if (err.response.promptFeedback.blockReason === "SAFETY") {
			console.log("SafetyReasons");
			res.json({
				success: false,
				message: "SafeReasons",
			});
		} else {
			res.json({
				err,
				success: false,
			});
		}
	}
};

tst("What is the electorl bonds ");
