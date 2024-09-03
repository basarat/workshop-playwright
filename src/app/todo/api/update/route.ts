import { NextRequest, NextResponse } from "next/server";
import { UpdateRequest, UpdateResponse } from "../../../../common/types";
import { getDb } from "../../../../server/db";

export async function POST(req: NextRequest) {
  const body: UpdateRequest = await req.json();

  const db = await getDb();
  const found = db.data.items.find(item => item.id == body.id);

  if (!found) {
    const response: UpdateResponse = {
      status: 'error',
      reason: 'Item not found'
    };
    return NextResponse.json(response);
  }

  const newItems = db.data.items.map(x => {
    if (x.id === body.id) {
      return {
        ...x,
        completed: body.completed
      }
    } else {
      return x;
    }
  });
  db.data.items = newItems;
  await db.write();

  const response: UpdateResponse = {
    status: 'success',
  };
  return NextResponse.json(response);
}
