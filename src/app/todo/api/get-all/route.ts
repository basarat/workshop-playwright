import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../../server/db";
import { GetAllResponse } from "../../../../common/types";

export default async function GET(_req: NextRequest) {
  const response: GetAllResponse = {
    items: (await getDb()).data.items,
  };
  return NextResponse.json(response);
}
