import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './GameRevealScreen.styles';

export default function GameRevealScreen() {
  const router = useRouter();
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
        // Future: Navigate to Actual Game Screen
        Alert.alert('تم!', 'كل اللاعبين شافوا أدوارهم. خلينا نبلش!', [
          { text: 'أوكي', onPress: () => router.replace('/') }
        ]);
      }
    } else {
      toggleReveal();
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>
            {!isRoleRevealed ? `أنا ${currentPlayer}` : isLastPlayer ? 'بلش اللعبة!' : 'اللاعب التالي'}
          </Text>
        </TouchableOpacity>
        
        {isRoleRevealed && !isLastPlayer && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]} 
            onPress={toggleReveal}
          >
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>إخفي الكلمة</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

import { Alert } from 'react-native';
