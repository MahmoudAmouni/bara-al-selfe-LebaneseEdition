import React from 'react';
import { FlatList, View, Text, StatusBar } from 'react-native';
import { getCategories } from '@/constants/categoriesConfig';
import { CategoryCard } from '@/components/CategoryCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './index.styles';

export default function HomeScreen() {
  const categories = getCategories();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE0B2" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>برا السالفة</Text>
        <Text style={styles.subtitle}>النسخة اللبنانية</Text>
        <Text style={styles.instruction}>إختار الفئة لتبلش اللعب!</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 16 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard 
            category={item} 
            onPress={() => console.log('Selected Category:', item.id)} 
          />
        )}
      />
    </View>
  );
}
