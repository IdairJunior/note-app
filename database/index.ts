import * as SQLite from 'expo-sqlite';

export async function setupDatabase() {
  // Abre ou cria o banco de dados
  const db = await SQLite.openDatabaseAsync('note-app.db');
  console.log('Banco de dados aberto ou criado:', db);

  return db;
}

export async function createDataBase () {

   const db = await setupDatabase();

   // Criação da tabela equipment
  
   await db.execAsync(`
    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT NOT NULL, 
      description TEXT, 
      modelId INTEGER NOT NULL
    );`);

  console.log('Tabela "equipment" criada com sucesso.');
}




 