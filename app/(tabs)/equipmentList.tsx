import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { deleteEquipmentById, fetchEquipment } from '@/database/equipament/queires';

interface Equipment {
  id: number;
  name: string;
  description: string;
  modelId: number;
}

const EquipmentList = () => {

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useEffect(() => {
    loadEquipment(); 
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Você tem certeza que deseja excluir este equipamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              // Aqui você pode implementar a lógica de exclusão no banco de dados
              console.log(`Equipamento com ID ${id} excluído.`);
              setEquipmentList((prev) => prev.filter((equip) => equip.id !== id));
              deleteEquipmentById(id);
            } catch (error) {
              console.error('Erro ao excluir equipamento:', error);
              Alert.alert('Erro', 'Não foi possível excluir o equipamento.');
            }
          },
        },
      ]
    );
  };

  const loadEquipment = async () => {
    try {
      const result = await fetchEquipment();

      console.log('Equipamentos:', result);

       setEquipmentList(result); 
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de equipamentos.');
    }
  };
  
  const renderItem = ({ item }: { item: Equipment }) => (
    <View style={styles.itemContainer}>
        
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemModel}>Modelo ID: {item.modelId}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <FontAwesome name="trash" size={24} color="#d9534f" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Lista de Equipamentos</Text>

      {equipmentList.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum equipamento cadastrado.</Text>
      ) : (
        <FlatList
          data={equipmentList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemModel: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default EquipmentList;
