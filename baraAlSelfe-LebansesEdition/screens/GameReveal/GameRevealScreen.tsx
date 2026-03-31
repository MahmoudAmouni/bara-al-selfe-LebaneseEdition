import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './GameRevealScreen.styles';

export default function GameRevealScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { 
    players, 
    currentPlayerIndex, 
    isRoleRevealed, 
    secretWord, 
    spyIndex, 
    toggleReveal, 
    nextPlayer 
  } = useGameStore();

  const currentPlayer = players[currentPlayerIndex];
  const isSpy = currentPlayerIndex === spyIndex;
  const isLastPlayer = currentPlayerIndex === players.length - 1;

  const handleNext = () => {
    if (isRoleRevealed) {
      const hasMore = nextPlayer();
      if (!hasMore) {
        router.replace('/question-phase' as never);
      }
    } else {
      toggleReveal();
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <View style={styles.card}>
          {!isRoleRevealed ? (
            <>
              <Text style={styles.instructionTitle}>مرّق التلفون لـ</Text>
              <Text style={styles.playerName}>{currentPlayer}</Text>
              <Text style={styles.revealIcon}>📱</Text>
            </>
          ) : (
            <>
              <Text style={styles.instructionTitle}>{currentPlayer}، إنت</Text>
              <Text style={styles.revealIcon}>{isSpy ? '🕵️‍♂️' : '💡'}</Text>
              
              {isSpy ? (
                <Text style={styles.spyText}>برا السالفة!</Text>
              ) : (
                <View style={styles.secretWordCard}>
                  <Text style={styles.statusText}>الكلمة السرية هي:</Text>
                  <Text style={styles.secretWordText}>{secretWord}</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>
            {!isRoleRevealed
              ? `أنا ${currentPlayer}`
              : isLastPlayer
              ? 'بلش الأسئلة! 🎤'
              : 'اللاعب التالي'}
          </Text>
        </TouchableOpacity>
        
    </View>
    </View>
  );
}
