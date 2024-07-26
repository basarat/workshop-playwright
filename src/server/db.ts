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

/** Create the json file adapter */
const adapter = new JSONFile<DBSchema>('db.json');

/** The DB powered by the adapter */
const db = new Low(adapter, { items: [] });

export async function getDb() {
  await db.read();
  return db;
}
