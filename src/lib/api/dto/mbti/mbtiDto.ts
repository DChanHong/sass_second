export class MbtiGetResponseDto {
    code: string;
    name: string;
    title: string;
    description: string;
    sorting: number;
    bgColor: string;
    textColor: string;
    keyword: string;
    mainIcon: string;
    mainDescription: string;

    constructor(data: any) {
        this.code = data.code;
        this.name = data.name;
        this.title = data.title;
        this.description = data.description;
        this.sorting = data.sorting;
        this.bgColor = data.bgColor;
        this.textColor = data.textColor;
        this.keyword = data.keyword;
        this.mainIcon = data.mainIcon;
        this.mainDescription = data.mainDescription;
    }
}