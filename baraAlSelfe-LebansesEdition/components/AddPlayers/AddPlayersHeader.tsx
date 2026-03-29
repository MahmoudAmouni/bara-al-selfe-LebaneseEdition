import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
        <Text style={styles.backButtonText}>← رجوع</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
      
      {categoryTitle && (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>الفئة: {categoryTitle}</Text>
        </View>
      )}
    </View>
  );
};
