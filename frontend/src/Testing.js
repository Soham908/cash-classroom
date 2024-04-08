import Exa from "exa-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

const Testing = () => {
	return (
		<div style={{ display: "flex", padding: "100px" }}>
			<Editor />;
		</div>
	);
};

export default Testing;
