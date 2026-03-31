import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './GameRevealScreen.styles';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  ZoomIn, 
  Layout,
  FadeOut
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

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

  const handleNext = async () => {
    // Provide tactile feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header / Progress */}
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={{ alignItems: 'center', marginBottom: 20 }}
        >
          <Text style={styles.statusText}>
            اللاعب {currentPlayerIndex + 1} من {players.length}
          </Text>
        </Animated.View>

        <Animated.View 
          key={isRoleRevealed ? 'revealed' : 'instruction'}
          entering={ZoomIn.duration(400)}
          exiting={FadeOut.duration(200)}
          layout={Layout.springify()}
          style={styles.card}
        >
          {!isRoleRevealed ? (
            <>
              <Text style={styles.instructionTitle}>مرّق التلفون لـ</Text>
              <Text style={styles.playerName}>{currentPlayer}</Text>
              
              <Animated.View 
                entering={ZoomIn.delay(300).springify()}
                style={styles.iconContainer}
              >
                <Text style={styles.revealIcon}>📱</Text>
              </Animated.View>
              
              <Text style={styles.instructionTitle}>بس توصل، إكبس الزر تحت 👇</Text>
            </>
          ) : (
            <>
              <Text style={styles.instructionTitle}>{currentPlayer}، إنت</Text>
              
              <Animated.View 
                entering={ZoomIn.duration(600).springify()}
                style={[styles.iconContainer, isSpy && styles.spyIconContainer]}
              >
                <Text style={styles.revealIcon}>{isSpy ? '🕵️‍♂️' : '💡'}</Text>
              </Animated.View>
              
              {isSpy ? (
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.spyText}>برا السالفة!</Text>
                  <Text style={styles.spySubText}>حاول تعرف عن شو عم بيحكوا بدون ما يكشفوك! 🤫</Text>
                </View>
              ) : (
                <Animated.View 
                  entering={FadeInDown.delay(200)}
                  style={styles.secretWordCard}
                >
                  <Text style={styles.statusText}>الكلمة السرية هي:</Text>
                  <Text style={styles.secretWordText}>{secretWord}</Text>
                </Animated.View>
              )}
            </>
          )}
        </Animated.View>
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

