import React from "react";
import { getResponse } from "./../../actions/chatbotAction";
import styles from "./chatbot.module.css";
import Markdown from "react-markdown";
import { useRef } from "react";
import { Button } from "@mui/joy";
import { Send } from "@mui/icons-material";
import { useEffect } from "react";

export default function Chatbot() {
	const [history, setHistory] = React.useState([]);
	const [input, setInput] = React.useState("");
	const [showChatbot, setShowChatbot] = React.useState(false);
	const chatDiv = useRef(null);

	useEffect(() => {
		if (chatDiv.current) {
			chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
		}
	}, [history]);
	const handleClick = async () => {
		setInput("");
		const response = await getResponse({ history, prompt: input });

		if (!response?.success) {
			if (response?.message === "Safety Reasons") {
				setHistory((prev) => [
					...prev,
					{
						role: "model",
						parts: [
							{
								text: "I'm sorry, but I can't answer that question. It involves topics that are unsafe or could potentially cause harm. Would you like me to try answering something different?",
							},
						],
					},
				]);
			}
		} else {
			setHistory((prev) => [
				...prev,
				{ role: "model", parts: [{ text: response.text }] },
			]);
		}

		// setHistory((prev) => [
		// 	...prev,
		// 	{ role: "user", parts: [{ text: input }] },
		// ]);
	};

	return (
		<div className={styles.chatbotContainer}>
			{showChatbot ? (
				<div className={styles.container}>
					<div className={styles.close} onClick={() => setShowChatbot(false)}>
						X
					</div>
					<div className={styles.chat} ref={chatDiv}>
						{history.map((el, i) => {
							return (
								<span
									className={el.role === "user" ? styles.user : styles.model}
									key={i}
								>
									{<Markdown>{el.parts[0].text}</Markdown>}
								</span>
							);
						})}
					</div>
					<div className={styles.inputContainer}>
						<input
							type="text"
							value={input}
							className={styles.promptInput}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									if (input) {
										setHistory((prev) => [
											...prev,
											{ role: "user", parts: [{ text: input }] },
										]);
										handleClick();
									}
								}
							}}
						/>

						<Button
							variant="contained"
							color="primary"
							onClick={(e) => {
								if (input) {
									setHistory((prev) => [
										...prev,
										{ role: "user", parts: [{ text: input }] },
									]);
									handleClick();
								}
							}}
							startIcon={<Send />}
						>
							Send
						</Button>
					</div>
				</div>
			) : (
				<div className={styles.circle} onClick={() => setShowChatbot(true)}>
					<img
						src="/chat-bot.png"
						style={{ width: "inherit", height: "inherit" }}
						alt="chatbot-logo"
					></img>
				</div>
			)}
		</div>
	);
}
