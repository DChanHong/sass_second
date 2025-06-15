import { NextRequest, NextResponse } from 'next/server';
import MbtiService from '@/lib/api/services/mbti/mbtiService';
import { MbtiGetResponseDto } from '@/lib/api/dto/mbti/mbtiDto';


export async function GET(req: NextRequest) {
    const mbtiService = MbtiService.getInstance();
    try {
        const result = await mbtiService.getMbtiList();
        const data = result.map((item) => new MbtiGetResponseDto(item));
        return NextResponse.json({ result: true, data });
    } catch (error) {
        return NextResponse.json({ result: false, data: null, error: 'Failed to create MBTI result' }, { status: 500 });
    }
}
