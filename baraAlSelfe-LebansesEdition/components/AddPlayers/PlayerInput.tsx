import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './PlayerInput.styles';

interface PlayerInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
  placeholder?: string;
}

export const PlayerInput = ({ value, onChangeText, onAdd, placeholder }: PlayerInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8D6E63"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={onAdd}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
