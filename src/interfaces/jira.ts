export interface SimpleIssue {
    title: string
    description: string
}

export interface ADF {
    version: number;
    type: string;
    content: ADFNode[];
}

export interface ADFNode {
    type: string;
    content: ADFContentNode[];
}

export interface ADFContentNode extends ADFNode {
    text?: string;
}
  