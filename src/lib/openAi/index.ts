import { OpenAI } from 'openai';

export const openAiInstance = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

interface GenerateAnswerAnalysisParams {
    mbti: { code: string; name: string };
    answers: any[];
    scene: { icon: string; text: string; code: string };

}

export async function testOpenAiConnection() {
    try {
        const response = await openAiInstance.models.list(); // ✅ 가능한 모델 목록 요청
        console.log('✅ OpenAI 연결 성공: 사용 가능한 모델 목록:', response.data.map(m => m.id));
        return true;
    } catch (error) {
        console.error('❌ OpenAI 연결 실패:', error);
        return false;
    }
}

export const generateAnswerAnalysis = async ({
                                                 mbti,
                                                 answers,
                                                 scene
                                             }: {
    mbti: { code: string; name: string };
    answers: {
        id: string;
        question: string
        options: string[]
        checked: string
    }[];
    scene: { icon: string; text: string; code: string };
}) => {

    const isConnected = await testOpenAiConnection();
    if (!isConnected) {
        throw new Error('OpenAI 연결 실패: API Key 확인 필요');
    }

    console.log('🧠 generateAnswerAnalysis 시작');

    const systemPrompt = `
            너는 사용자의 MBTI 성격 유형, 생활 장면(scene), 선택한 라이프스타일 답변(answers)을 바탕으로 아래 두 가지 결과를 생성하는 역할이야.
            
            ❶ [4줄 요약]  
            → answers 배열의 'checked' 값을 기반으로, 사용자가 어떤 공간과 분위기를 선호하는지를 **명확하고 자연스럽게 요약된 문장 4개**로 구성해줘.  
            → **각 문장은 반드시 '다.'로 끝나는 문장**이어야 하며, 배열 형태로 출력해.  
            → 예를 들어: ["조용한 공간을 선호한다.", "밝은 조명을 싫어한다.", "따뜻한 색감을 좋아한다.", "혼자만의 시간을 중요하게 생각한다."]
            
            ❷ [성향 분석]  
            → 주어진 MBTI의 일반적인 성향과 scene.text 의미, answers를 참고해서 사용자의 라이프스타일 전반을 묘사해줘.  
            → **자연스럽고 풍부하게 한 문단으로 작성하되, 마지막은 반드시 완결된 문장('다.')으로 끝나도록 해.**
            
            🎯 결과는 다음 JSON 형태로 출력해:
            {
              "summary": ["...", "...", "...", "..."],
              "personality": "..."
            }
`;


    const userPrompt = `
        사용자의 MBTI는 ${mbti.name} (${mbti.code})입니다.
        Scene은 "${scene.text}"이며, 코드 값은 ${scene.code}입니다.

        선택한 답변은 다음과 같습니다:
        ${answers.map((a, i) => `Q${i + 1}. ${a.question} → ${a.checked}`).join('\n')}
        `;

    console.log('📝 System Prompt:', systemPrompt);
    console.log('📝 User Prompt:', userPrompt);

    let content = '';
    try {
        const response = await openAiInstance.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.7
        });
        console.log('response', response);

        content = response.choices?.[0]?.message?.content || '';
        console.log('✅ GPT 응답 내용:', content);
    } catch (error) {
        console.error('❌ GPT 요청 실패:', error);
        throw new Error('GPT 호출 실패'); // 이걸 throw 안 하면 try 블록 이후도 계속 실행됨
    }

    try {
        const parsed = JSON.parse(content!);
        console.log('✅ 파싱된 결과:', parsed);
        return parsed;
    } catch (e) {
        console.error('❌ JSON 파싱 실패:', e);
        return {
            error: 'AI 응답 파싱 실패',
            raw: content
        };
    }
};


