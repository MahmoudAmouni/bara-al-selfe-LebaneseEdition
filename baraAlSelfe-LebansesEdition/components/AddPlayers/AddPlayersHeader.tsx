import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './AddPlayersHeader.styles';

interface AddPlayersHeaderProps {
  title: string;
  categoryTitle?: string;
  onBack: () => void;
}

export const AddPlayersHeader = ({ title, categoryTitle, onBack }: AddPlayersHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="chevron-forward" size={26} color="#2D3748" />
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {categoryTitle && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{categoryTitle}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
