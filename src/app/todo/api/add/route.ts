import { NextRequest, NextResponse } from "next/server";
import { AddRequest, AddResponse } from "../../../../common/types";
import { getDb } from "../../../../server/db";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const body: AddRequest = await req.json();

  const id = uuid();
  const db = await getDb();
  db.data.items.push({
    id: id,
    completed: false,
    message: body.message,
  });
  await db.write();

  const createResponse: AddResponse = { id };
  return NextResponse.json(createResponse);
}
