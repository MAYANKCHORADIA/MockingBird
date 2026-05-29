import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const MAX_DELAY_MS = 10_000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  const { endpointId } = await params;

  const mock = await db.mockEndpoint.findUnique({
    where: { id: endpointId },
  });

  if (!mock) {
    return NextResponse.json(
      { error: "Mock endpoint not found." },
      { status: 404 }
    );
  }

  // Honour the configured delay, but cap it to prevent socket timeouts
  if (mock.delayMs > 0) {
    await sleep(Math.min(mock.delayMs, MAX_DELAY_MS));
  }

  return NextResponse.json(mock.payload, { status: mock.httpStatus });
}
