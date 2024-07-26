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
const file = path.join(__dirname, 'db.json');

/** Create the json file adapter */
const adapter = new JSONFile<DBSchema>(file);

/** The DB powered by the adapter */
const db = new Low(adapter, { items: [] });

export async function getDb() {
  await db.read();
  // console.log('db.data', db.data);
  // db.data.items.push({ id: 'first', completed: false, message: 'testing' });
  // await db.write();
  return db;
}
