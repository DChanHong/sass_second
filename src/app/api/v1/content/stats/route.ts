import { NextResponse } from 'next/server';
import MbtiContentService from '@/lib/api/services/mbti/mbtiContentService';

const mbtiContentService = MbtiContentService.getInstance();

/**
 * GET /api/v1/content/stats
 * 모든 MBTI 타입별 컨텐츠 개수 통계 조회
 */
export async function GET() {
    try {
        console.log('📊 Content stats API request');

        // 서비스 호출
        const stats = await mbtiContentService.getContentCounts();

        console.log('✅ Content stats API success:', stats);

        return NextResponse.json({
            success: true,
            data: {
                stats,
                total: Object.values(stats).reduce((sum, count) => sum + count, 0),
                mbtiTypes: Object.keys(stats).length
            }
        });

    } catch (error) {
        console.error('❌ Content stats API error:', error);
        
        return NextResponse.json(
            { 
                success: false, 
                error: 'Internal server error',
                message: '서버 내부 오류가 발생했습니다.'
            },
            { status: 500 }
        );
    }
}
