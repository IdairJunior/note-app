
import { setupDatabase } from '@/database';
import * as SQLite from 'expo-sqlite';

export async function deleteEquipmentById(id: number): Promise<void> {
  const db = await setupDatabase();

  try {
    await db.runAsync('DELETE FROM equipment WHERE id = ?;', [id]);
    console.log(`Equipamento com ID ${id} foi removido com sucesso.`);
  } catch (error) {
    console.error(`Erro ao tentar remover o equipamento com ID ${id}:`, error);
    throw error; // Opcional: Propaga o erro para lidar no nível superior
  }
}

export async function insertEquipment(name: string, description: string, modelId: number) {

  const db = await  setupDatabase()

    await db.runAsync('INSERT INTO equipment (name, description, modelId) VALUES (?, ?, ?);', [name, description, modelId]);
  
    console.log(`Equipamento "${name}" inserido com sucesso.`);
  }
  
  interface Equipment {
    id: number;
    name: string;
    description: string;
    modelId: number;
  }
  

  export async function fetchEquipment(): Promise<Equipment[]> {
    return await fetchData<Equipment>('SELECT * FROM equipment;');
  }



export async function fetchData<T>(query: string) : Promise<T[]> {
  const db = await  setupDatabase()

  console.log('Executando consulta:', query);
  
  const result = (await db.getAllAsync(query)) ;

  console.log('Resultado da consulta:', result);

  return result as T[]; // Faz o casting para o tipo genérico
}