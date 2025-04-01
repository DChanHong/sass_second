import { NextResponse } from 'next/server';
import { calculateBazi } from '@/lib/bazi/calculator';
import { BaziInput } from '@/lib/bazi/types';

export async function POST(request: Request) {
  try {
    const input: BaziInput = await request.json();

    // 입력값 검증
    if (!input.year || !input.month || !input.day || !input.hour || !input.minute || !input.gender) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 날짜 유효성 검사
    const date = new Date(input.year, input.month - 1, input.day);
    if (date.getFullYear() !== input.year || date.getMonth() + 1 !== input.month || date.getDate() !== input.day) {
      return NextResponse.json(
        { error: '유효하지 않은 날짜입니다.' },
        { status: 400 }
      );
    }

    const result = calculateBazi(input);
    return NextResponse.json(result);
  } catch (error) {
    console.error('사주팔자 계산 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사주팔자 계산 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 