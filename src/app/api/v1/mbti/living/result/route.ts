import { NextRequest, NextResponse } from 'next/server';
import { CreateMbtiResultDto } from '@/lib/api/dto/mbti/mbtiLivingDto';
import MBtiLivingService from '@/lib/api/services/mbti/mbtiLivingService';
import { generateAnswerAnalysis } from '@/lib/openAi';


export async function POST(req: NextRequest) {
    const mBtiLivingService = MBtiLivingService.getInstance();
    try {
        const body: {
            mbti: {
                code: string
                name: string
            },
            answers: {
                id: string;
                question: string
                options: string[]
                checked: string
            }[]
            scene: { icon: string; text: string; code: string };
        } = await req.json();

        const analysisResult = await generateAnswerAnalysis(body);
        // const analysisResult = {
        //     summary: [
        //         '조용한 공간을 선호한다.',
        //         '어둡고 차가운 분위기를 선호한다.',
        //         '촉감이 부드럽고 편안한 느낌을 좋아한다.',
        //         '혼자만의 시간을 중요하게 생각한다.'
        //     ],
        //     personality: 'ENTP 유형의 당신은 사색적이면서도 독창적인 성향을 가지고 있습니다. \'혼자만의 시간을 중요하게 생각해요\'라는 scene에서도 그 특에서 오래 머무는 것을 즐기며, 무소음 가전을 통해 조용한 시간을 즐기고 싶어합니다. 이러한 취향들은 당신의 독특하면서도 창의적인 성향을 잘 대변하고 있습니다.\n'
        // };


        const dto = new CreateMbtiResultDto(body, analysisResult);
        // if (!dto.isValid()) {
        //     return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        // }

        const result = await mBtiLivingService.createMbtiLivingResult(dto);
        if (result) {
            return NextResponse.json({ result: true, data: result.uuid }, { status: 200 });
        } else {
            return NextResponse.json({
                result: false,
                data: null,
                error: 'Failed to create MBTI result'
            }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ result: false, data: null, error: 'Failed to create MBTI result' }, { status: 500 });
    }
}
