import { insertEquipment } from "@/database/equipament/queires";

describe('insertEquipment - Testes de Tipagem', () => {

    it('deve lançar erro para parâmetros inválidos', async () => {
       
        await expect(insertEquipment('', 'Valid Description', 1)).rejects.toThrow();
        await expect(insertEquipment('Valid Name', '', 1)).rejects.toThrow();
        await expect(insertEquipment('Valid Name', 'Valid Description', -1)).rejects.toThrow();
    });

    it('deve lançar erro ao passar tipos inválidos', async () => {
    
        await expect(insertEquipment(123 as any, 'Valid Description', 123)).rejects.toThrow();
        await expect(insertEquipment('Valid Name', 123 as any, 123)).rejects.toThrow();
        await expect(insertEquipment('Valid Name', 'Valid Description', '123' as any)).rejects.toThrow();
    });

    it('deve lançar erro ao passar valores faltando ou nulos', async () => {
       
        await expect(insertEquipment(undefined as any, 'Valid Description', 123)).rejects.toThrow();
        await expect(insertEquipment('Valid Name', undefined as any, 123)).rejects.toThrow();
        await expect(insertEquipment('Valid Name', 'Valid Description', null as any)).rejects.toThrow();
    });
});
