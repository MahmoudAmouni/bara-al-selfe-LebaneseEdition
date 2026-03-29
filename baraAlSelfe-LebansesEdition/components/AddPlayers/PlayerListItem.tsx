import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './PlayerListItem.styles';

interface PlayerListItemProps {
  name: string;
  index: number;
  onRemove: () => void;
}

export const PlayerListItem = ({ name, index, onRemove }: PlayerListItemProps) => {
  return (
    <View style={styles.playerItem}>
      <View style={styles.playerInfo}>
        <View style={styles.playerNumber}>
          <Text style={styles.playerNumberText}>{index + 1}</Text>
        </View>
        <Text style={styles.playerName}>{name}</Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};
