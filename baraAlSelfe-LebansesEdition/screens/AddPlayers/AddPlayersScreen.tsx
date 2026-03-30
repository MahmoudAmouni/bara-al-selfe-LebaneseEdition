import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORIES_CONFIG, CategoryKey } from '@/constants/categoriesConfig';
import { styles } from './AddPlayersScreen.styles';
import { AddPlayersHeader } from '@/components/AddPlayers/AddPlayersHeader';
import { PlayerInput } from '@/components/AddPlayers/PlayerInput';
import { PlayerListItem } from '@/components/AddPlayers/PlayerListItem';
import { useGameStore } from '@/store/useGameStore';

export default function AddPlayersScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: CategoryKey }>();
  const insets = useSafeAreaInsets();
  const { startGame, players: storedPlayers } = useGameStore();
  
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>(storedPlayers ?? []);
  
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
    
    if (categoryId) {
      startGame(players, categoryId);
      router.push('/game-reveal');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AddPlayersHeader 
        title="إضافة لاعبين"
        categoryTitle={categoryInfo?.title}
        onBack={() => router.back()}
      />

      <View style={styles.content}>
        <PlayerInput 
          value={playerName}
          onChangeText={setPlayerName}
          onAdd={handleAddPlayer}
          placeholder="أدخل اسم اللاعب..."
        />

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
            <PlayerListItem 
              name={item}
              index={index}
              onRemove={() => removePlayer(index)}
            />
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
