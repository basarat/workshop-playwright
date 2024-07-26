import { NextRequest, NextResponse } from "next/server";
import { SetAllRequest, SetAllResponse } from "../../../../common/types";
import { getDb } from "../../../../server/db";

export default async function PUT(req: NextRequest) {
  const body: SetAllRequest = await req.json();

  const db = await getDb();
  db.data.items = body.items;
  await db.write();

  const setAllResponse: SetAllResponse = { status: "success" };
  return NextResponse.json(setAllResponse);
}
