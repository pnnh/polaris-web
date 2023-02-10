import { marked } from "marked";


export function markdownToStele(markdown: string) {
    var body: any = { children: [] };
    let tokens = marked.lexer(markdown);
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case "heading":
                body.children.push({
                    name: "header",
                    header: token.depth,
                    children: [{
                        name: "text",
                        text: token.text
                    }]
                })
                break;
            case "paragraph":
                body.children.push({
                    name: "paragraph",
                    children: [{
                        name: "text",
                        text: token.text
                    }]
                })
                break;
            case "code":
                body.children.push({
                    name: "code-block",
                    language: token.lang,
                    children: [{
                        name: "text",
                        text: token.text
                    }]
                })
                break;
            default:
                body.children.push({
                    name: "paragraph",
                    children: [{
                        name: "text",
                        text: token.raw
                    }]
                })

        }
    }
    return body;
}