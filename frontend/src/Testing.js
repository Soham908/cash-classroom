// import {
// 	MDXEditor,
// 	headingsPlugin,
// 	listsPlugin,
// 	markdownShortcutPlugin,
// 	quotePlugin,
// 	thematicBreakPlugin,
// 	UndoRedo,
// 	BoldItalicUnderlineToggles,
// 	toolbarPlugin,
// 	linkPlugin,
// 	ListsToggle,
// 	Separator,
// } from "@mdxeditor/editor";

// import "./testing.css";

// const Testing = () => {
// 	const markdown = `Hello [world](https://google.com/)`;
// 	return (
// 		<div style={{ padding: "100px" }}>
// 			<MDXEditor
// 				contentEditableClassName="mardownEditor"
// 				style={{ padding: "30px" }}
// 				plugins={[
// 					headingsPlugin(),
// 					listsPlugin(),
// 					quotePlugin(),
// 					markdownShortcutPlugin(),
// 					thematicBreakPlugin(),
// 					linkPlugin(),

// 					toolbarPlugin({
// 						toolbarContents: () => (
// 							<nav className="toolbar">
// 								<UndoRedo className="undoredo" />
// 								<BoldItalicUnderlineToggles />
// 								<ListsToggle />
// 							</nav>
// 						),
// 					}),
// 				]}
// 				markdown={markdown}
// 			/>
// 		</div>
// 	);
// };

// export default Testing;
import "./testing.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
	],
};

const Testing = () => {
	const [value, setValue] = useState("");
	return (
		<div className="containerTesting">
			<div className="row">
				<div className="editor">
					<ReactQuill
						theme="snow"
						value={value}
						onChange={setValue}
						className="editor-input"
						modules={modules}
					/>
				</div>
				<div
					className="preview"
					dangerouslySetInnerHTML={{ __html: value }}
				></div>
			</div>
		</div>
	);
};

export default Testing;
