export class CreateMbtiResultDto {
    mbtiType: string;
    mbtiTitle: string;
    mbtiDescription: string;
    preferences: any;
    selections: any;

    constructor(data: any) {
        this.mbtiType = data.mbtiType;
        this.mbtiTitle = data.mbtiTitle;
        this.mbtiDescription = data.mbtiDescription;
        this.preferences = data.preferences;
        this.selections = data.selections;
    }

    isValid() {
        return (
            typeof this.mbtiType === 'string' &&
            typeof this.mbtiTitle === 'string' &&
            typeof this.mbtiDescription === 'string' &&
            typeof this.preferences === 'object' &&
            Array.isArray(this.selections)
        );
    }
}
