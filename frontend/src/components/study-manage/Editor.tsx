import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
// import * as Emoji from "quill-emoji";
import { markdownToHtml, htmlToMarkdown } from "./Parser";

import "react-quill/dist/quill.snow.css";
// import "quill-emoji/dist/quill-emoji.css";

// Quill.register("modules/emoji", Emoji);

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  //   [{ indent: "-1" }, { indent: "+1" }],
  //   ["emoji"],
  //   ["clean"],
];

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState<string>(markdownToHtml(props.value || ""));
  const reactQuillRef = useRef<ReactQuill>(null);

  const onChange = (content: string) => {
    setValue(content);

    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content),
      });
    }
  };

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      placeholder="Start writing..."
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
        // "emoji-toolbar": true,
        // "emoji-textarea": false,
        // "emoji-shortname": true,
      }}
      value={value}
      onChange={onChange}
    />
  );
}
