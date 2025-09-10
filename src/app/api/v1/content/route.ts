import { NextRequest, NextResponse } from 'next/server';
import MbtiContentService from '@/lib/api/services/mbti/mbtiContentService';
import type { ApiResult } from '@/types/api';

const mbtiContentService = MbtiContentService.getInstance();

/**
 * GET /api/v1/content
 * MBTI 코드별 컨텐츠 목록 조회 (페이지네이션)
 * 
 * Query Parameters:
 * - mbtiCode: string (required) - MBTI 코드 (예: ENFP, INTJ)
 * - page: number (optional, default: 1) - 페이지 번호
 * - limit: number (optional, default: 10) - 페이지당 항목 수 (최대 50)
 * - sortBy: string (optional, default: 'createdAt') - 정렬 기준 ('createdAt' | 'uuid')
 * - sortOrder: string (optional, default: 'desc') - 정렬 순서 ('asc' | 'desc')
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Query parameters 추출
        const mbtiCode = searchParams.get('mbtiCode');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder');

        // 필수 파라미터 검증
        if (!mbtiCode) {
            return NextResponse.json<ApiResult>(
                {
                    result: false,
                    data: null,
                    error: 'MBTI 코드를 제공해주세요.'
                },
                { status: 400 }
            );
        }

        // 파라미터 변환 및 기본값 설정
        const requestData = {
            mbtiCode: mbtiCode.toUpperCase(),
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
            sortBy: (sortBy as 'createdAt' | 'uuid') || 'createdAt',
            sortOrder: (sortOrder as 'asc' | 'desc') || 'desc'
        };

        // 파라미터 유효성 검사
        if (requestData.page < 1) {
            return NextResponse.json<ApiResult>(
                {
                    result: false,
                    data: null,
                    error: '페이지 번호는 1 이상이어야 합니다.'
                },
                { status: 400 }
            );
        }

        if (requestData.limit < 1 || requestData.limit > 50) {
            return NextResponse.json<ApiResult>(
                {
                    result: false,
                    data: null,
                    error: 'limit은 1-50 사이의 값이어야 합니다.'
                },
                { status: 400 }
            );
        }

        if (!['createdAt', 'uuid'].includes(requestData.sortBy)) {
            return NextResponse.json<ApiResult>(
                {
                    result: false,
                    data: null,
                    error: 'sortBy는 createdAt 또는 uuid이어야 합니다.'
                },
                { status: 400 }
            );
        }

        if (!['asc', 'desc'].includes(requestData.sortOrder)) {
            return NextResponse.json<ApiResult>(
                {
                    result: false,
                    data: null,
                    error: 'sortOrder는 asc 또는 desc이어야 합니다.'
                },
                { status: 400 }
            );
        }

        console.log('📡 Content API request:', requestData);

        // 서비스 호출
        const serviceResult = await mbtiContentService.getContentList(requestData);

        console.log('✅ Content API success:', {
            mbtiCode: requestData.mbtiCode,
            itemsReturned: serviceResult.items.length,
            total: serviceResult.pagination.total
        });

        return NextResponse.json<ApiResult>({
            result: true,
            data: serviceResult
        });

    } catch (error) {
        console.error('❌ Content API error:', error);
        
        return NextResponse.json<ApiResult>(
            {
                result: false,
                data: null,
                error: '서버 내부 오류가 발생했습니다.'
            },
            { status: 500 }
        );
    }
}
