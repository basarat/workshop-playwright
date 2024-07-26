import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { TodoItem } from '../common/types';

/**
 * Schema
 */
type DBSchema = {
  items: TodoItem[];
};

/** Use JSON file for storage */
const file = path.join(__dirname, '../../db.json');
const adapter = new JSONFile<DBSchema>(file);

/** The DB */
const db = new Low(adapter, { items: [] });


export async function getDb() {
  await db.read();
  return db;
}
