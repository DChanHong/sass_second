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
        hours: body.hour,
        minutes: body.min,
        seconds: 0,
        latitude: 17.38405,
        longitude: 78.45636,
        timezone: 5.5,
        config: {
          observation_point: "topocentric",
          ayanamsha: "tropical",
          house_system: "Placidus",
          language: "ja",
          exclude_planets: [],
          allowed_aspects: [
            "Conjunction",
            "Opposition",
            "Trine",
            "Square",
            "Sextile",
            "Semi-Sextile",
            "Quintile",
            "Septile",
            "Octile",
            "Novile",
            "Quincunx",
            "Sesquiquadrate",
          ],
          aspect_line_colors: {
            Conjunction: "#558B6E",
            Opposition: "#88A09E",
            Square: "#704C5E",
            Trine: "#B88C9E",
            Sextile: "#F1C8DB",
            "Semi-Sextile": "#A799B7",
            Quintile: "#9888A5",
            Septile: "#776472",
            Octile: "#445552",
            Novile: "#294D4A",
            Quincunx: "#49306B",
            Sesquiquadrate: "#E1CDB5",
          },
          wheel_chart_colors: {
            zodiac_sign_background_color: "#303036",
            chart_background_color: "#303036",
            zodiac_signs_text_color: "#FFFFFF",
            dotted_line_color: "#FFFAFF",
            planets_icon_color: "#FFFAFF",
          },
          orb_values: {
            Conjunction: 3,
            Opposition: 5,
            Square: 5,
            Trine: 5,
            Sextile: 5,
            "Semi-Sextile": 5,
            Quintile: 5,
            Septile: 5,
            Octile: 5,
            Novile: 5,
            Quincunx: 5,
            Sesquiquadrate: 5,
          },
        },
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
