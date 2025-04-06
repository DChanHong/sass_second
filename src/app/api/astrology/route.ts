import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { WesternAstrologyFormData } from "@/lib/_types/astrology";
import { RequestWithUser, userWrapper } from "@/app/api/userWrapper";

const API_KEY = process.env.FREE_ASTROLOGY_API_KEY;
const BASE_URL = "https://json.freeastrologyapi.com";

async function handler(request: RequestWithUser) {
  try {
    const body: WesternAstrologyFormData = await request.json();
    console.log("body", body);
    console.log("API_KEY", API_KEY);

    // 필수 파라미터 검증
    if (
      body.year === undefined ||
      body.month === undefined ||
      body.day === undefined ||
      body.hour === undefined ||
      body.min === undefined ||
      body.lat === undefined ||
      body.lon === undefined ||
      body.tzone === undefined ||
      body.house_type === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Free Astrology API 요청
    const response = await axios.post(
      `${BASE_URL}/western/natal-wheel-chart`,
      {
        year: body.year,
        month: body.month,
        date: body.day,
        hour: body.hour,
        min: body.min,
        lat: body.lat,
        lon: body.lon,
        tzone: body.tzone,
        house_type: body.house_type || "placidus", // 기본값 설정 가능
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Astrology API Error:", error.message);
    console.error("Response status:", error.response?.status);
    console.error("Response data:", error.response?.data); // 👈 중요!
    return NextResponse.json(
      { error: error.response?.data || "Internal server error" },
      { status: error.response?.status || 500 }
    );
  }
}

export const POST = userWrapper(handler);
