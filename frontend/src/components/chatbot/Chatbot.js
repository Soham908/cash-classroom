import React, { useEffect } from "react";
import { getResponse } from "./../../actions/chatbotAction";
import styles from "./chatbot.module.css";
import Markdown from "react-markdown";
import { useRef } from "react";

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
		if (input != "") {
			setInput("");
			const response = await getResponse({ history, prompt: input });
			if (!response.success) {
				window.location.reload();
			}
			setHistory((prev) => [
				...prev,
				{ role: "model", parts: [{ text: response.text }] },
			]);
		}
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
									setHistory((prev) => [
										...prev,
										{ role: "user", parts: [{ text: input }] },
									]);
									handleClick();
								}
							}}
						/>

						<img
							src="/send.png"
							alt="send logo"
							className={styles.send}
							onClick={() => {
								setHistory((prev) => [
									...prev,
									{ role: "user", parts: [{ text: input }] },
								]);
								handleClick();
							}}
						></img>
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
