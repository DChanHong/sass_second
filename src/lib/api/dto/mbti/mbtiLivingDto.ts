export class CreateMbtiResultDto {
    mbtiCode: string; // 외래키
    preferenceSummary: string[]; // jsonb array 4줄 요약
    mbtiAnalysisSummary: string; // text 1줄 요약
    selections: any[]; // jsonb array
    scene: any;

    constructor(data: {
        mbti: {
            code: string
            name: string
        },
        answers: {
            id: string;
            question: string
            options: string[]
            checked: string
        }[],
        scene: { icon: string; text: string; code: string };
    }, analysisResult: {
        summary: string[]
        personality: string
    }) {
        this.mbtiCode = data.mbti.code;
        this.preferenceSummary = analysisResult && analysisResult.summary.length > 0 ? analysisResult.summary.map((item) => item) : [];
        this.mbtiAnalysisSummary = analysisResult.personality || '';
        this.selections = data.answers;
        this.scene = data.scene;
    }

    isValid() {
        return (
            typeof this.mbtiCode === 'string' &&
            Array.isArray(this.preferenceSummary) &&
            typeof this.mbtiAnalysisSummary === 'string' &&
            Array.isArray(this.selections)
        );
    }
}



