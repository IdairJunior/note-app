// app/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Biblioteca de ícones do Expo
import { useAuth } from '@/hooks/AuthContext';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
   const { logout } = useAuth();
   const router = useRouter();

  const handleLogout = () => {
     logout();
     router.replace('/loginScreen'); 
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao aplicativo !</Text>
      <Text style={styles.message}>Escolha uma das opções abaixo:</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/(tabs)/registerEquipment')}
      >
        <FontAwesome5 name="tools" size={24} color="#fff" />
        <Text style={styles.buttonText}>Cadastro de Equipamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/(tabs)/equipmentList')}
      >
        <FontAwesome5 name="list" size={24} color="#fff" />
        <Text style={styles.buttonText}>Listagem de Equipamentos</Text>
      </TouchableOpacity>
     
      <TouchableOpacity
        style={styles.button}
        
       onPress={() => router.navigate('/(tabs)/registerPoint')}
      >
        <FontAwesome5 name="clipboard-list" size={24} color="#fff" />
        <Text style={styles.buttonText}>Cadastro de Apontamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: '#f4f6f8',
    marginBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default HomeScreen;
