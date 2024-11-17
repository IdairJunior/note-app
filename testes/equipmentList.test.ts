import { fetchEquipment } from '@/database/equipament/queires';
import * as SQLite from 'expo-sqlite';

// Mock do SQLite
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(),
}));

describe('fetchEquipment - Testes com Mocks', () => {
  let mockDb: any;

  beforeEach(() => {
   
    mockDb = {
      getAllAsync: jest.fn().mockResolvedValue([
        { id: 1, name: 'Equipment A', description: 'Description A', modelId: 101 },
        { id: 2, name: 'Equipment B', description: 'Description B', modelId: 102 },
      ]),
    };

    (SQLite.openDatabaseAsync as jest.Mock).mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('deve retornar um array de objetos do tipo Equipment', async () => {
    const result = await fetchEquipment();

    expect(Array.isArray(result)).toBe(true);

    result.forEach((equipment) => {
      expect(equipment).toHaveProperty('id');
      expect(typeof equipment.id).toBe('number');

      expect(equipment).toHaveProperty('name');
      expect(typeof equipment.name).toBe('string');

      expect(equipment).toHaveProperty('description');
      expect(typeof equipment.description).toBe('string');

      expect(equipment).toHaveProperty('modelId');
      expect(typeof equipment.modelId).toBe('number');
    });
  });

  it('deve chamar getAllAsync com a consulta correta', async () => {
    await fetchEquipment();

    expect(mockDb.getAllAsync).toHaveBeenCalledWith('SELECT * FROM equipment;');
  });
});
