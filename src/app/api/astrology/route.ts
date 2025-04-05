import { NextRequest, NextResponse } from "next/server";
import serverAxios from "@/lib/axiosInstance/server";
import {
  AstrologyRequestParams,
  AstrologyResponse,
  Horoscope,
} from "@/lib/astrology/types";

const API_KEY = process.env.FREE_ASTROLOGY_API_KEY;
const BASE_URL = "https://json.freeastrologyapi.com/v1";

export async function POST(request: NextRequest) {
  try {
    const body: AstrologyRequestParams = await request.json();

    // 필수 파라미터 검증
    if (
      !body.date ||
      !body.time ||
      !body.latitude ||
      !body.longitude ||
      !body.timezone
    ) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Free Astrology API 요청
    const response = await serverAxios.post<AstrologyResponse<Horoscope>>(
      `${BASE_URL}/planets`,
      {
        date: body.date,
        time: body.time,
        latitude: body.latitude,
        longitude: body.longitude,
        timezone: body.timezone,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Astrology API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.response?.status || 500 }
    );
  }
}
