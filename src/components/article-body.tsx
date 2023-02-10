'use client';

import { TocItem } from '@/models/article';
import { generatorRandomString } from '@/utils/helpers';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';
import styled, { css } from 'styled-components';

export function BuildBodyHtml(props: { tocList: Array<TocItem>, node: any }) {

    if (!props.node) return <></>;
    var children = props.node["children"] as Array<object>;
    if (!children || children.length < 1) return <></>;

    return <div>
        {
            children.map((child, index) => {
                return <div key={index}>{buildNode(props.tocList, child, index.toString())}</div>
            })
        }
    </div>;
}

function buildNode(tocList: Array<TocItem>, node: any, nodeKey: string) {
    if (!node) return <></>;
    var name = node["name"] as string;
    switch (name) {
        case "paragraph":
            return buildParagraph(tocList, node);
        case "header":
            return buildHeader(tocList, node);
        case "code-block":
            return buildCodeBlock(tocList, node, nodeKey);
    }
    return <></>;
}

function buildParagraph(tocList: Array<TocItem>, node: any) {
    if (!node) return <p></p>;
    var children = node["children"] as Array<object>;
    if (!children || children.length < 1) return <p></p>;

    return <p className='paragraph'>
        {children.map((child, index) => {
            return <span key={index}>{buildText(child)}</span>
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


export function buildCodeBlock(tocList: Array<TocItem>, node: any, nodeKey: string) {
    var language = node["language"] as Language;
    var children = node["children"] as Array<object>;
    var codeText = children.map((child) => buildText(child)).join("");

    return <Highlight {...defaultProps} theme={github} code={codeText} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
            // todo 加入以下两行会导致客户端和服务器渲染不一致从而出错，需要解决
            // style['padding'] = '8px';
            // style['white-space'] = 'pre-line';

            return <pre className={className} style={style}>
                {tokens.map((line, i) => {
                    return <div {...getLineProps({ line, key: i })} key={nodeKey + "_" + i.toString()} >

                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} key={key} />
                        ))}
                    </div>
                })}
            </pre>
        }
        }
    </Highlight >

}

export function buildText(node: any) {
    var text = node["text"] as string;
    return text;
}