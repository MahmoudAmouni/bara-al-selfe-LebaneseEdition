import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { CategoryInfo } from '../constants/categoriesConfig';
import { styles } from './CategoryCard.styles';

interface CategoryCardProps {
  category: CategoryInfo;
  onPress?: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: category.color },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.emojiContainer}>
        <Text style={styles.emojiText}>{category.emoji}</Text>
      </View>
      <Text style={styles.titleText}>{category.title}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{category.itemCount} كلمة</Text>
      </View>
    </Pressable>
  );
}
