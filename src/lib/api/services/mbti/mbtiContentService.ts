import { 
    ContentListRequestDto, 
    ContentListResponseDto 
} from '@/lib/api/dto/mbti/mbtiContentDto';
import MbtiContentRepository from '@/lib/api/repository/mbti/mbtiContentRepository';

export default class MbtiContentService {
    private static instance: MbtiContentService;
    private mbtiContentRepository: MbtiContentRepository;

    constructor() {
        this.mbtiContentRepository = new MbtiContentRepository();
    }

    public static getInstance(): MbtiContentService {
        if (!MbtiContentService.instance) {
            MbtiContentService.instance = new MbtiContentService();
        }
        return MbtiContentService.instance;
    }

    /**
     * MBTI 코드별 컨텐츠 목록 조회 (페이지네이션)
     */
    async getContentList(requestData: {
        mbtiCode: string;
        page?: number;
        limit?: number;
        sortBy?: 'createdAt' | 'uuid';
        sortOrder?: 'asc' | 'desc';
    }): Promise<ContentListResponseDto> {
        try {
            // DTO 생성 및 유효성 검사
            const dto = new ContentListRequestDto(requestData);
            
            if (!dto.isValid()) {
                throw new Error('Invalid request parameters');
            }

            console.log('📋 Content list request:', {
                mbtiCode: dto.mbtiCode,
                page: dto.page,
                limit: dto.limit,
                sortBy: dto.sortBy,
                sortOrder: dto.sortOrder
            });

            // 병렬로 데이터 조회
            const [contentResult, mbtiInfo] = await Promise.all([
                this.mbtiContentRepository.getMbtiContentList(dto),
                this.mbtiContentRepository.getMbtiInfo(dto.mbtiCode)
            ]);

            // 응답 DTO 생성
            const response = new ContentListResponseDto({
                items: contentResult.items,
                total: contentResult.total,
                page: dto.page,
                limit: dto.limit,
                mbtiInfo: mbtiInfo
            });

            console.log('✅ Content list service success:', {
                itemsCount: response.items.length,
                total: response.pagination.total,
                totalPages: response.pagination.totalPages,
                currentPage: response.pagination.page
            });

            return response;

        } catch (error) {
            console.error('❌ Content list service error:', error);
            throw error;
        }
    }

    /**
     * 모든 MBTI 타입별 컨텐츠 개수 조회
     */
    async getContentCounts(): Promise<{ [key: string]: number }> {
        try {
            console.log('📊 Getting content counts for all MBTI types');
            
            const counts = await this.mbtiContentRepository.getMbtiContentCounts();
            
            console.log('✅ Content counts service success:', counts);
            return counts;

        } catch (error) {
            console.error('❌ Content counts service error:', error);
            throw error;
        }
    }

    /**
     * 특정 MBTI 타입 정보 조회
     */
    async getMbtiInfo(mbtiCode: string) {
        try {
            if (!mbtiCode || typeof mbtiCode !== 'string') {
                throw new Error('Invalid MBTI code');
            }

            console.log('🔍 Getting MBTI info for:', mbtiCode);
            
            const mbtiInfo = await this.mbtiContentRepository.getMbtiInfo(mbtiCode);
            
            console.log('✅ MBTI info service success:', mbtiInfo);
            return mbtiInfo;

        } catch (error) {
            console.error('❌ MBTI info service error:', error);
            throw error;
        }
    }
}
