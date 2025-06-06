export const mbtiSituationMockupData = [
    { icon: '🌙', text: '혼자만의 시간을 중요하게 생각해요', code: 'alone' },
    { icon: '🛋️', text: '집에서 쉬는 걸 가장 좋아해요', code: 'relax' },
    { icon: '❓', text: 'MBTI를 모르시나요? 나의 MBTI 찾기', isMbti: true }, // 특별 항목
    { icon: '🎨', text: '감성적인 인테리어를 좋아해요', code: 'emotional' },
    { icon: '📦', text: '실용성이 가장 중요해요', code: 'practical' }
];
// { icon: '🎉', text: '집에 사람 초대하는 걸 즐겨요', code: 'social' },
// { icon: '🧹', text: '깔끔하고 정돈된 공간을 좋아해요', code: 'clean' },
// { icon: '🛏️', text: '잠자리가 가장 중요해요', code: 'bed' },
// { icon: '📚', text: '집에서 집중할 수 있는 공간이 필요해요', code: 'focus' }


export type SceneQuestion = {
    id: string;
    question: string;
    options: string[];
};

export const mbtiSceneQuestionMap: Record<string, SceneQuestion[]> = {
    alone: [
        {
            id: 'alone-1',
            question: '어떤 조명이 가장 편안하게 느껴지시나요?',
            options: ['은은한 간접조명', '집중용 밝은 조명', '따뜻한 색상의 전구', '자연광 활용']
        },
        {
            id: 'alone-2',
            question: '선호하는 벽지나 커튼의 색감은?',
            options: ['무채색', '파스텔톤', '우드톤', '패턴 있는 벽지']
        },
        {
            id: 'alone-3',
            question: '혼자 쉴 때 어떤 공간이 좋으세요?',
            options: ['침대 위', '바닥 러그', '창가 근처', '포근한 소파']
        },
        {
            id: 'alone-4',
            question: '소음에 대한 민감도는?',
            options: ['매우 민감', '약간 민감', '크게 신경 안 씀']
        },
        {
            id: 'alone-5',
            question: '가장 오래 머무는 공간은 어디인가요?',
            options: ['침실', '거실', '책상', '베란다']
        },
        {
            id: 'alone-6',
            question: '조용한 시간을 위해 갖추고 싶은 아이템은?',
            options: ['방음 커튼', '아로마 디퓨저', '무소음 가전', '조명 스피커']
        }
    ],
    relax: [
        {
            id: 'relax-1',
            question: '집에서 쉬는 시간, 주로 무엇을 하시나요?',
            options: ['영상 시청', '독서/음악', '낮잠', '반신욕']
        },
        {
            id: 'relax-2',
            question: '휴식을 위한 필수 인테리어는?',
            options: ['소파', '조명', '러그', '식물']
        },
        {
            id: 'relax-3',
            question: '선호하는 휴식 공간 분위기는?',
            options: ['따뜻하고 포근한', '모던하고 깔끔한', '감성적', '자연친화적']
        },
        {
            id: 'relax-4',
            question: '쿠션은 몇 개까지 허용 가능한가요?',
            options: ['1~2개', '3~5개', '많을수록 좋다', '필요 없다']
        },
        {
            id: 'relax-5',
            question: '향 관련 선호도는?',
            options: ['아로마 필수', '디퓨저 정도', '무향 선호']
        },
        {
            id: 'relax-6',
            question: '집에서 가장 선호하는 시간대는?',
            options: ['아침', '낮', '저녁', '밤']
        }
    ],
    emotional: [
        {
            id: 'emotional-1',
            question: '감성적인 공간을 만드는 데 가장 중요한 요소는?',
            options: ['조명', '벽 꾸미기', '소품', '색감']
        },
        {
            id: 'emotional-2',
            question: '감성 공간을 위해 선택하는 색감은?',
            options: ['베이지/아이보리', '우드톤', '파스텔', '그레이/블랙']
        },
        {
            id: 'emotional-3',
            question: '어떤 소재를 선호하시나요?',
            options: ['패브릭', '우드', '유리', '메탈']
        },
        {
            id: 'emotional-4',
            question: '벽을 꾸민다면 어떤 걸 사용하실 건가요?',
            options: ['사진', '캘리그라피', '무드등', '식물']
        },
        {
            id: 'emotional-5',
            question: '감성 가전을 하나 고른다면?',
            options: ['LP 플레이어', '무드등 스피커', '빈티지 냉장고', '폴라로이드 프린터']
        },
        {
            id: 'emotional-6',
            question: '감성 인테리어의 목표는?',
            options: ['나만의 아지트', 'SNS 업로드', '위로/안정감', '자랑']
        }
    ],
    practical: [
        {
            id: 'practical-1',
            question: '인테리어 우선 순위는?',
            options: ['수납', '청소 용이성', '다기능', '배선 정리']
        },
        {
            id: 'practical-2',
            question: '가장 실용적인 가구 조합은?',
            options: ['침대+책상', '수납 침대', '접이식 테이블', '슬라이딩 옷장']
        },
        {
            id: 'practical-3',
            question: '실용성을 위해 포기할 수 있는 것은?',
            options: ['감성', '색감 통일', '조명 연출', '소품']
        },
        {
            id: 'practical-4',
            question: '가구 선택 시 가장 중요하게 보는 요소는?',
            options: ['가격', '내구성', '수납력', '디자인']
        },
        {
            id: 'practical-5',
            question: '수납은 어떻게 해결하나요?',
            options: ['붙박이장', '침대 밑 수납', '벽선반', '정리함/박스']
        },
        {
            id: 'practical-6',
            question: '작은 공간 활용 팁은?',
            options: ['접이식 가구', '수직 공간 활용', '불필요한 것 줄이기', '멀티 가구 사용']
        }
    ]
};


// export const mbtiQuestionMockupData = [
//     {
//         id: 1,
//         question: '오늘의 기분은 어떤가요?',
//         options: ['😊 활기차다', '😐 평범하다', '😴 피곤하다']
//     },
//     {
//         id: 2,
//         question: '주말엔 주로 무엇을 하나요?',
//         options: ['🏞️ 밖에 나가서 놀기', '📺 집에서 쉬기', '📚 자기계발']
//     },
//     {
//         id: 3,
//         question: '친구들과 약속이 생기면?',
//         options: ['💬 신나서 바로 준비!', '🤔 가기 전에 고민함', '🙅‍♀️ 귀찮아서 안 나감']
//     },
//     {
//         id: 4,
//         question: '당신의 정리 스타일은?',
//         options: ['🧼 완벽히 정리해야 마음이 편해요', '🙃 보이는 곳만 정리해요', '😅 대충 쌓아두는 편이에요']
//     },
//     {
//         id: 5,
//         question: '자취방 인테리어에 대한 생각은?',
//         options: ['🎨 예쁘게 꾸미고 싶어요', '🛋️ 실용성이 중요해요', '🪑 관심 없어요']
//     },
//     {
//         id: 6,
//         question: '쇼핑할 때 기준은?',
//         options: ['💸 가격 먼저 본다', '✨ 디자인 먼저 본다', '🧐 리뷰 꼼꼼히 본다']
//     },
//     {
//         id: 7,
//         question: '갑자기 친구가 놀러 온다면?',
//         options: ['😱 당황! 급청소 시작', '🫠 그냥 들인다', '😎 언제든 OK']
//     },
//     {
//         id: 8,
//         question: '하루 일과가 끝난 후 당신은?',
//         options: ['🛌 침대에 누워 넷플릭스', '📖 책을 읽거나 음악 듣기', '🍽️ 야식 챙기기']
//     }
// ];
