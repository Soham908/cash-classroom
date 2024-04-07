import React from "react";
import { getResponse } from "./../../actions/chatbotAction";
import styles from "./chatbot.module.css";
import Markdown from "react-markdown";
import { useRef } from "react";
import { Button } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import Skeleton from "@mui/material/Skeleton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

export default function Chatbot() {
	const [history, setHistory] = React.useState([]);
	const [input, setInput] = React.useState("");
	const [showChatbot, setShowChatbot] = React.useState(false);
	const [showChatSkeleton, setShowChatSkeleton] = React.useState(false);
	const chatDiv = useRef(null);

	useEffect(() => {
		if (chatDiv.current) {
			chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
		}
	}, [history]);
	const handleClick = async () => {
		setInput("");
		setShowChatSkeleton((p) => true);
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
		setShowChatSkeleton((p) => false);
		// setHistory((prev) => [
		// 	...prev,
		// 	{ role: "user", parts: [{ text: input }] },
		// ]);
	};

	return (
		<div className={styles.chatbotContainer}>
			{showChatbot ? (
				<div className={styles.container}>
					<CloseIcon
						fontSize="large"
						onClick={() => setShowChatbot(false)}
						className={styles.close}
					/>
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
						{showChatSkeleton && (
							<Skeleton
								variant="rectangular"
								animation="wave"
								width={230}
								height={60}
							/>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							type="text"
							value={input}
							className={styles.promptInput}
							disabled={showChatSkeleton}
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

						<SendIcon
							variant="contained"
							color="primary"
							sx={{ height: "35px", padding: "0px 10px" }}
							onClick={(e) => {
								if (input) {
									setHistory((prev) => [
										...prev,
										{ role: "user", parts: [{ text: input }] },
									]);
									handleClick();
								}
							}}
						/>
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
