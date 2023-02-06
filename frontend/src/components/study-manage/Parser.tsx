import { remark } from "remark";
import remarkHtml from "remark-html";

import rehypeParse from "rehype-parse";
import rehypeRaw from "rehype-raw";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export function markdownToHtml(markdownText: string) {
  const file = remark().use(remarkHtml).processSync(markdownText);
  return String(file);
}

export function htmlToMarkdown(htmlText: string) {
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeDocument)
    .processSync(htmlText);

  console.log(file);

  return String(file);
}
