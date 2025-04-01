import { BaziInput, BaziResult } from './types';

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'];

export function calculateBazi(input: BaziInput): BaziResult {
  // 간단한 예시 계산 로직
  const yearStem = HEAVENLY_STEMS[(input.year - 4) % 10];
  const yearBranch = EARTHLY_BRANCHES[(input.year - 4) % 12];
  const monthStem = HEAVENLY_STEMS[(input.month + 1) % 10];
  const monthBranch = EARTHLY_BRANCHES[(input.month + 1) % 12];
  const dayStem = HEAVENLY_STEMS[input.day % 10];
  const dayBranch = EARTHLY_BRANCHES[input.day % 12];
  const hourStem = HEAVENLY_STEMS[input.hour % 10];
  const hourBranch = EARTHLY_BRANCHES[input.hour % 12];

  // 예시 결과
  return {
    yearPillar: {
      heavenlyStem: yearStem,
      earthlyBranch: yearBranch,
    },
    monthPillar: {
      heavenlyStem: monthStem,
      earthlyBranch: monthBranch,
    },
    dayPillar: {
      heavenlyStem: dayStem,
      earthlyBranch: dayBranch,
    },
    hourPillar: {
      heavenlyStem: hourStem,
      earthlyBranch: hourBranch,
    },
    lifeStar: HEAVENLY_STEMS[Math.floor(Math.random() * 10)],
    bodyStar: HEAVENLY_STEMS[Math.floor(Math.random() * 10)],
    hiddenStars: [HEAVENLY_STEMS[Math.floor(Math.random() * 10)]],
    tenGods: {
      '正印': '木',
      '偏印': '火',
      '正官': '土',
      '偏官': '金',
      '正財': '水',
    },
    elements: {
      '木': Math.floor(Math.random() * 100),
      '火': Math.floor(Math.random() * 100),
      '土': Math.floor(Math.random() * 100),
      '金': Math.floor(Math.random() * 100),
      '水': Math.floor(Math.random() * 100),
    },
    analysis: '이 사주는 강한 목(木)의 기운을 가지고 있습니다. 생년월일시의 조화로운 배치가 좋은 운세를 예고합니다.',
  };
} 