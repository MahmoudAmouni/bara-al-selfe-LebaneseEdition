import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './PlayerInput.styles';

interface PlayerInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
  placeholder?: string;
}

export const PlayerInput = ({ value, onChangeText, onAdd, placeholder }: PlayerInputProps) => {
  const isDisabled = value.trim().length === 0;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <TouchableOpacity 
        style={[styles.addButton, isDisabled && styles.addButtonDisabled]} 
        onPress={onAdd}
        activeOpacity={0.7}
        disabled={isDisabled}
      >
        <Ionicons name="add" size={28} color={isDisabled ? "#CBD5E0" : "#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );
};
