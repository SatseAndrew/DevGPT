import { ADFContentNode, ADFNode } from "../../interfaces";

export function extractTextFromADF(node: ADFNode): string {
    console.log(node.type);
    if (node.type === 'text') {
        return (node as ADFContentNode).text ?? "";
    }

    if (node.type === 'paragraph') {
        return node.content.map((contentNode) => extractTextFromADF(contentNode)).join('') + '\n';
    }

    if (node.type === 'bulletList') {
        return node.content.map((contentNode) => '- ' + extractTextFromADF(contentNode) + '\n').join('') + '\n';
    }

    if (node.type === 'numberedList') {
        let index = 1;
        const result = node.content.map((contentNode) => {
            const numberedItem = `${index}. ${extractTextFromADF(contentNode)}\n`;
            index += 1;
            return numberedItem;
        }).join('') + '\n';
        return result;
    }

    if (Array.isArray(node.content)) {
        return node.content.map((contentNode) => extractTextFromADF(contentNode)).join(' ') + '\n';
    }
    
    return '';
}
