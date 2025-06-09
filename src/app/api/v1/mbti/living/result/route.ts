import { NextRequest, NextResponse } from 'next/server';
import { CreateMbtiResultDto } from '@/lib/api/dto/mbti/mbtiLivingDto';
import { createMbtiLivingResult, getMbtiResultByType } from '@/lib/api/services/mbti/mbtiLivingService';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const dto = new CreateMbtiResultDto(body);

        if (!dto.isValid()) {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        }

        const result = await createMbtiLivingResult(dto);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create MBTI result' }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const mbtiType = searchParams.get('mbtiType');

        if (!mbtiType) {
            return NextResponse.json({ error: 'mbtiType is required' }, { status: 400 });
        }

        const result = await getMbtiResultByType(mbtiType);

        if (!result) {
            return NextResponse.json({ error: 'MBTI result not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}