import { Low, JSONFile } from "lowdb";
import path from "path";
import { TodoItem } from "../common/types";

/**
 * Schema
 */
type DBSchema = {
  items: TodoItem[];
};

/** Use JSON file for storage */
const file = path.join(__dirname, "../../db.json");
const adapter = new JSONFile<DBSchema>(file);

/** The DB */
const db = new Low(adapter);

type SafeDb = Omit<typeof db, "data"> & { data: DBSchema };

export async function getDb(): Promise<SafeDb> {
  await db.read();
  db.data = db.data ||= { items: [] };
  return db as SafeDb;
}
