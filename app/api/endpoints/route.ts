import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let { payload, httpStatus = 200, delayMs = 0 } = body;

    // ── Validate payload ──
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "payload is required." },
        { status: 400 }
      );
    }

    // If the caller sent payload as a JSON string, parse it
    if (typeof payload === "string") {
      try {
        payload = JSON.parse(payload);
      } catch {
        return NextResponse.json(
          { success: false, error: "payload is not valid JSON." },
          { status: 400 }
        );
      }
    }

    const id = nanoid(8);

    await db.mockEndpoint.create({
      data: {
        id,
        payload,
        httpStatus: Number(httpStatus),
        delayMs: Number(delayMs),
      },
    });

    const mockUrl = `/api/mock/${id}`;

    return NextResponse.json({ success: true, id, mockUrl }, { status: 201 });
  } catch (error) {
    console.error("POST /api/endpoints error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const endpoints = await db.mockEndpoint.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, endpoints }, { status: 200 });
  } catch (error) {
    console.error("GET /api/endpoints error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
