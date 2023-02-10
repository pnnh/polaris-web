'use client';

import { TocItem } from '@/models/article';
import Highlight, { defaultProps, Language, Language } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';


export function BuildBodyHtml(props: { tocList: Array<TocItem>, node: any }) {

    if (!props.node) return <></>;
    var children = props.node["children"] as Array<object>;
    if (!children || children.length < 1) return <></>;


    return <div>
        {
            children.map((child) => {
                return buildNode(props.tocList, child);
            })
        }
    </div>;
}

function buildNode(tocList: Array<TocItem>, node: any) {
    if (!node) return <></>;
    var name = node["name"] as string;
    switch (name) {
        case "paragraph":
            return buildParagraph(tocList, node);
        case "header":
            return buildHeader(tocList, node);
        case "code-block":
            return buildCodeBlock(tocList, node);
    }
    return <></>;
}

function buildParagraph(tocList: Array<TocItem>, node: any) {
    if (!node) return <p></p>;
    var children = node["children"] as Array<object>;
    if (!children || children.length < 1) return <p></p>;

    return <p className='paragraph'>
        {children.map((child) => {
            return buildText(child)
        })}
    </p>;
}

function buildHeader(tocList: Array<TocItem>, node: any) {
    var header = node["header"] as number;
    var children = node["children"] as Array<object>;
    var headerTitle = children.map((child) => buildText(child)).join("");
    tocList.push({ title: headerTitle, header: header });

    switch (header) {
        case 1:
            return <h1>{headerTitle}</h1>
        case 2:
            return <h2>{headerTitle}</h2>
        case 3:
            return <h3>{headerTitle}</h3>
        case 4:
            return <h4>{headerTitle}</h4>
        case 5:
            return <h5>{headerTitle}</h5>
        case 6:
            return <h6>{headerTitle}</h6>
    }
    return <></>

}


export function buildCodeBlock(tocList: Array<TocItem>, node: any) {
    var language = node["language"] as Language;
    var children = node["children"] as Array<object>;
    var codeText = children.map((child) => buildText(child)).join("");
  
    return <Highlight {...defaultProps} theme={github} code={codeText} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (

            <pre className={className} style={style}>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>

}

export function buildText(node: any) {
    var text = node["text"] as string;
    return text;
}