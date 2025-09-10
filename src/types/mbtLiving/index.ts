export interface MbtiSelection {
    id: string;
    checked: string;
    options: string[];
    question: string;
}

export interface Scene {
    code: string;
    icon: string;
    text: string;
}

export interface MbtiInfo {
    code: string;
    name: string;
    title: string;
    bgColor: string;
    keyword: string;
    sorting: number;
    textColor: string;
    description: string;
}

export interface MbtiResult {
    uuid: string;
    mbtiCode: string;
    createdAt: string;
    preferenceSummary: string[];
    mbtiAnalysisSummary: string;
    selections: MbtiSelection[];
    index_mbticode_idx: string;
    scene: Scene;
    mbti: MbtiInfo;
}