// Content 페이지를 위한 DTO 클래스들

export class ContentListRequestDto {
    mbtiCode: string;
    page: number;
    limit: number;
    sortBy: 'createdAt' | 'uuid';
    sortOrder: 'asc' | 'desc';

    constructor(data: {
        mbtiCode: string;
        page?: number;
        limit?: number;
        sortBy?: 'createdAt' | 'uuid';
        sortOrder?: 'asc' | 'desc';
    }) {
        this.mbtiCode = data.mbtiCode;
        this.page = data.page || 1;
        this.limit = data.limit || 10;
        this.sortBy = data.sortBy || 'createdAt';
        this.sortOrder = data.sortOrder || 'desc';
    }

    isValid() {
        return (
            typeof this.mbtiCode === 'string' &&
            this.mbtiCode.length > 0 &&
            this.page > 0 &&
            this.limit > 0 &&
            this.limit <= 50 // 최대 50개 제한
        );
    }

    getOffset() {
        return (this.page - 1) * this.limit;
    }
}

export class ContentItemResponseDto {
    uuid: string;
    mbtiCode: string;
    preferenceSummary: string[];
    mbtiAnalysisSummary: string;
    scene: any;
    createdAt: string;
    mbti?: {
        code: string;
        name: string;
        title: string;
        bgColor: string;
        textColor: string;
    };

    constructor(data: any) {
        this.uuid = data.uuid;
        this.mbtiCode = data.mbtiCode;
        this.preferenceSummary = data.preferenceSummary || [];
        this.mbtiAnalysisSummary = data.mbtiAnalysisSummary || '';
        this.scene = data.scene;
        this.createdAt = data.createdAt;
        
        if (data.mbti) {
            this.mbti = {
                code: data.mbti.code,
                name: data.mbti.name,
                title: data.mbti.title,
                bgColor: data.mbti.bgColor,
                textColor: data.mbti.textColor,
            };
        }
    }
}

export class ContentListResponseDto {
    items: ContentItemResponseDto[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    mbtiInfo?: {
        code: string;
        name: string;
        title: string;
        description: string;
        bgColor: string;
        textColor: string;
        keyword: string;
    };

    constructor(data: {
        items: any[];
        total: number;
        page: number;
        limit: number;
        mbtiInfo?: any;
    }) {
        this.items = data.items.map(item => new ContentItemResponseDto(item));
        
        const totalPages = Math.ceil(data.total / data.limit);
        this.pagination = {
            page: data.page,
            limit: data.limit,
            total: data.total,
            totalPages,
            hasNext: data.page < totalPages,
            hasPrev: data.page > 1,
        };

        if (data.mbtiInfo) {
            this.mbtiInfo = {
                code: data.mbtiInfo.code,
                name: data.mbtiInfo.name,
                title: data.mbtiInfo.title,
                description: data.mbtiInfo.description,
                bgColor: data.mbtiInfo.bgColor,
                textColor: data.mbtiInfo.textColor,
                keyword: data.mbtiInfo.keyword,
            };
        }
    }
}
