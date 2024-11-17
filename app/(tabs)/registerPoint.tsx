import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome } from '@expo/vector-icons';
import CustomSelectorModal from '@/components/CustomSelectorModal';

interface Operator {
  id: string;
  name: string;
}

interface Equipment {
  id: string;
  name: string;
}

const RegisterPoint = () => {
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [operatorModalVisible, setOperatorModalVisible] = useState(false);
  const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<string | null>(null);

  const operators: Operator[] = [
    { id: '1', name: 'Operador 1' },
    { id: '2', name: 'Operador 2' },
    { id: '3', name: 'Operador 3' },
  ];

  const equipments: Equipment[] = [
    { id: '1', name: 'Equipamento 1' },
    { id: '2', name: 'Equipamento 2' },
    { id: '3', name: 'Equipamento 3' },
  ];

  const showDatePicker = (type: string) => {
    setCurrentPicker(type);
    setDatePickerVisible(true);
  };

  const showTimePicker = (type: string) => {
    setCurrentPicker(type);
    setTimePickerVisible(true);
  };

  const handleConfirmDate = (date: Date) => {
    if (currentPicker === 'startDate') setStartDate(date);
    if (currentPicker === 'endDate') setEndDate(date);
    setDatePickerVisible(false);
  };

  const handleConfirmTime = (time: Date) => {
    if (currentPicker === 'startTime') setStartTime(time);
    if (currentPicker === 'endTime') setEndTime(time);
    setTimePickerVisible(false);
  };

  const handleRegister = () => {
    if (selectedOperator && selectedEquipment && startDate && startTime && endDate && endTime) {
      Alert.alert('Registro bem-sucedido', `Apontamento registrado para o operador ${selectedOperator} com o equipamento ${selectedEquipment}!`);
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Apontamento</Text>

      <TouchableOpacity onPress={() => setOperatorModalVisible(true)} style={styles.selectorButton}>
        <Text style={styles.selectorText}>
          {selectedOperator || 'Selecione o Operador'}
        </Text>
        <FontAwesome name="angle-down" size={20} color="#888" />
      </TouchableOpacity>

      <CustomSelectorModal
        visible={operatorModalVisible}
        data={operators}
        title="Selecione o Operador"
        keyExtractor={(item) => item.id}
        renderItemLabel={(item) => item.name}
        onSelect={(operator) => {
          setSelectedOperator(operator.name);
          setOperatorModalVisible(false);
        }}
        onClose={() => setOperatorModalVisible(false)}
      />

      <TouchableOpacity onPress={() => setEquipmentModalVisible(true)} style={styles.selectorButton}>
        <Text style={styles.selectorText}>
          {selectedEquipment || 'Selecione o Equipamento'}
        </Text>
        <FontAwesome name="angle-down" size={20} color="#888" />
      </TouchableOpacity>

      <CustomSelectorModal
        visible={equipmentModalVisible}
        data={equipments}
        title="Selecione o Equipamento"
        keyExtractor={(item) => item.id}
        renderItemLabel={(item) => item.name}
        onSelect={(equipment) => {
          setSelectedEquipment(equipment.name);
          setEquipmentModalVisible(false);
        }}
        onClose={() => setEquipmentModalVisible(false)}
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={() => showDatePicker('startDate')} style={[styles.dateButton, styles.dateField]}>
          <Text style={styles.dateText}>
            {startDate ? startDate.toLocaleDateString() : 'Data de Início'}
          </Text>
          <FontAwesome name="calendar" size={20} color="#888" style={styles.iconEnd} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showTimePicker('startTime')} style={[styles.dateButton, styles.timeField]}>
          <Text style={styles.dateText}>
            {startTime ? startTime.toLocaleTimeString() : 'Hora'}
          </Text>
          <FontAwesome name="clock-o" size={20} color="#888" style={styles.iconEnd} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => showDatePicker('endDate')} style={[styles.dateButton, styles.dateField]}>
          <Text style={styles.dateText}>
            {endDate ? endDate.toLocaleDateString() : 'Data Final'}
          </Text>
          <FontAwesome name="calendar" size={20} color="#888" style={styles.iconEnd} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showTimePicker('endTime')} style={[styles.dateButton, styles.timeField]}>
          <Text style={styles.dateText}>
            {endTime ? endTime.toLocaleTimeString() : 'Hora'}
          </Text>
          <FontAwesome name="clock-o" size={20} color="#888" style={styles.iconEnd} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f7',
    marginBottom: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateField: {
    width: '60%',
  },
  timeField: {
    width: '38%',
  },
  dateText: {
    color: '#333',
    fontSize: 16,
    flex: 1,
  },
  iconEnd: {
    marginLeft: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 50,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterPoint;
