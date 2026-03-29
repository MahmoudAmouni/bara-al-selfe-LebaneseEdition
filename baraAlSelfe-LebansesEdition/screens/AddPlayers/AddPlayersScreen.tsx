import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORIES_CONFIG, CategoryKey } from '@/constants/categoriesConfig';
import { styles } from './AddPlayersScreen.styles';

export default function AddPlayersScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: CategoryKey }>();
  const insets = useSafeAreaInsets();
  
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  
  const categoryInfo = categoryId ? CATEGORIES_CONFIG[categoryId] : null;

  const handleAddPlayer = () => {
    if (playerName.trim().length === 0) return;
    
    if (players.includes(playerName.trim())) {
      Alert.alert('خطأ', 'هذا الاسم موجود مسبقاً');
      return;
    }

    setPlayers([...players, playerName.trim()]);
    setPlayerName('');
  };

  const removePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  const handleStart = () => {
    if (players.length < 3) {
      Alert.alert('عذراً', 'يجب إضافة 3 لاعبين على الأقل للبدء');
      return;
    }
    
    console.log('Starting game with:', players, 'Category:', categoryId);
    // Future step: Navigate to word selection
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← رجوع</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>إضافة لاعبين</Text>
        
        {categoryInfo && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>الفئة: {categoryInfo.title}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل اسم اللاعب..."
            placeholderTextColor="#8D6E63"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddPlayer}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={players}
          keyExtractor={(item, index) => `${item}-${index}`}
          style={styles.playerList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                لم يتم إضافة لاعبين بعد.{'\n'}أضف 3 لاعبين على الأقل للبدء!
              </Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <View style={styles.playerItem}>
              <View style={styles.playerInfo}>
                <View style={styles.playerNumber}>
                  <Text style={styles.playerNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.playerName}>{item}</Text>
              </View>
              <TouchableOpacity onPress={() => removePlayer(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity 
          style={[styles.nextButton, players.length < 3 && styles.nextButtonDisabled]}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>ابدأ اللعب!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
