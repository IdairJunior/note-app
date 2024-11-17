import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomSelectorModal from '@/components/CustomSelectorModal';
import { fetchEquipment, insertEquipment } from '@/database/equipament/queires';

interface EquipmentModel {
  id: number;
  name: string;
}

const EquipmentRegister = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const [modelModalVisible, setModelModalVisible] = useState(false);

  const models: EquipmentModel[] = [
    { id: 1, name: 'Modelo A' },
    { id: 2, name: 'Modelo B' },
    { id: 3, name: 'Modelo C' },
  ];

  useEffect(() => {
    fetchEquipment();
  }, []);

  const cleanfields = () => {
    setName('');
    setDescription('');
    setSelectedModel(0);
  }

  const handleRegister = async () => {
    if (name && description && selectedModel) {
      try {
        console.log("Nome: ", name)
        console.log("Descrição: ", description)
        console.log("Modelo: ", selectedModel)
        
        await insertEquipment(name, description, selectedModel);
  
        Alert.alert('Cadastro bem-sucedido', `Equipamento "${name}" registrado com sucesso!`);
  
        cleanfields()

      } catch (error) {
        console.error('Erro ao cadastrar equipamento:', error);
        Alert.alert('Erro', 'Não foi possível registrar o equipamento.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Equipamento</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="pencil" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome do Equipamento"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="align-left" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity onPress={() => setModelModalVisible(true)} style={styles.selectorButton}>
        <Text style={styles.selectorText}>
          {selectedModel || 'Selecione o Modelo'}
        </Text>
        <FontAwesome name="angle-down" size={20} color="#888" />
      </TouchableOpacity>

      <CustomSelectorModal
        visible={modelModalVisible}
        data={models}
        title="Selecione o Modelo"
        keyExtractor={(item) => item.id.toString()}
        renderItemLabel={(item) => item.name}
        onSelect={(model) => {
          setSelectedModel(model.id);
          setModelModalVisible(false);
        }}
        onClose={() => setModelModalVisible(false)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar Equipamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default EquipmentRegister;
