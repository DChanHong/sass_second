import { NextRequest, NextResponse } from 'next/server';
import MBtiLivingService from '@/lib/api/services/mbti/mbtiLivingService';

export async function GET(req: NextRequest) {

    const mBtiLivingService = MBtiLivingService.getInstance();
    try {
        const resultUuid = req.nextUrl.searchParams.get('resultUuid');
        if (!resultUuid) {
            return NextResponse.json({
                result: false,
                data: null,
                error: 'Failed to select by uuyd MBTI result'
            }, { status: 500 });
        }

        const result = await mBtiLivingService.getByUuidLivingSingleResult(resultUuid);
        if (result) {
            return NextResponse.json({ result: true, data: result }, { status: 200 });
        } else {
            return NextResponse.json({
                result: false,
                data: null,
                error: 'Failed to select by uuyd MBTI result'
            }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({
            result: false,
            data: null,
            error: 'Failed to select by uuyd MBTI result'
        }, { status: 500 });
    }
}