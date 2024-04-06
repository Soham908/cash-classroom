import Exa from "exa-js";
import { useState } from "react";
const Testing = () => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");

	const handleClick = async () => {
		const exa = new Exa("cf125a6c-cdc8-44d7-9f6d-c94f6b39e17a");
		const res = await exa.search(input);
		console.log(res);
		setOutput(res);
	};

	return (
		<>
			<input value={input} onChange={(e) => setInput(e.target.value)} />
			<button onClick={handleClick}>Submit</button>
			{output}
		</>
	);
};

export default Testing;
