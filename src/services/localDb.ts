import * as SQLite from "expo-sqlite";

export const dbPromise = SQLite.openDatabaseAsync("patient_HomePage.db");

export async function initDB() {
  const db = await dbPromise;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS patient_cases (
      id INTEGER PRIMARY KEY,
      title TEXT,
      status TEXT,
      description TEXT,
      time_ago TEXT
    );
  `);

const rows = await db.getAllAsync("SELECT * FROM patient_cases");

console.log("DATA FROM SQLITE:", rows);
  return db;
}


export async function saveCasesToLocal(cases: any[]) {
  const db = await initDB();
  // Clear the table first to ensure consistency (remove items deleted on server)
  await db.runAsync("DELETE FROM patient_cases;");
  
  for (const c of cases) {
    await db.runAsync(
      `INSERT OR REPLACE INTO patient_cases (id, title, status, description, time_ago)
       VALUES (?, ?, ?, ?, ?);`,
      c.id,
      c.title,
      c.status,
      c.description,
      c.time_ago
    );
  }
}

export async function deleteLocalCase(id: number) {
  const db = await initDB();
  await db.runAsync("DELETE FROM patient_cases WHERE id = ?;", id);
}

export async function getLocalCases() {
  const db = await initDB();
console.log("datanase",db)
  return await db.getAllAsync(
    `SELECT * FROM patient_cases ORDER BY id DESC;`
  );
  
}
