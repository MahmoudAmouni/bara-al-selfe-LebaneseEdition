import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        styles.cardContainer,
        pressed && styles.cardPressed,
      ]}
    >
      <LinearGradient
        colors={[
          category.color,
          category.color + 'E6', // slightly transparent version for depth
          category.color + 'CC', // more transparent at the bottom
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category.itemCount} كلمة</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.emojiText}>{category.emoji}</Text>
          <Text style={styles.titleText}>{category.title}</Text>
        </View>
        
        {/* Subtle glass reflection overlay */}
        <LinearGradient
          colors={['rgba(255,255,255,0.4)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.glassReflection}
          pointerEvents="none"
        />
      </LinearGradient>
    </Pressable>
  );
}
