import React from 'react';
import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './QuestionPhaseScreen.styles';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  ZoomIn, 
  FadeOut,
  Layout
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const PLAYER_EMOJIS = ['🧑', '👩', '🧔', '👱', '🧕', '👨', '🧒', '👧'];

export default function QuestionPhaseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const players = useGameStore((s) => s.players);
  const round = useGameStore((s) => s.round);
  const currentStep = useGameStore((s) => s.currentStep);
  const guidedPairs = useGameStore((s) => s.guidedPairs);
  const currentAskerIndex = useGameStore((s) => s.currentAskerIndex);
  const previousAskerIndex = useGameStore((s) => s.previousAskerIndex);
  const round2QuestionCount = useGameStore((s) => s.round2QuestionCount);
  const nextGuidedStep = useGameStore((s) => s.nextGuidedStep);
  const askPlayer = useGameStore((s) => s.askPlayer);
  const endQuestionPhaseEarly = useGameStore((s) => s.endQuestionPhaseEarly);

  const n = players.length;
  const isGuidedRound = round === 1;

  const minRequired = Math.min(1, n - 1);
  const maxLimit = n + Math.floor(n / 2);
  const remaining = Math.max(0, maxLimit - round2QuestionCount);
  const wordsNeeded = Math.max(0, minRequired - round2QuestionCount);
  const canVote = round === 2 && round2QuestionCount >= minRequired;

  const phaseOver = round === 3 || remaining <= 0;

  const availableTargets = players
    .map((_, index) => index)
    .filter((index) => {
      if (round === 2) {
        return index !== currentAskerIndex && index !== previousAskerIndex;
      }
      return false;
    });

  const handleNextStep = async (callback: () => void) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    callback();
  };

  const handleRoundEnd = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace('/voting' as never);
  };

  if (phaseOver) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Animated.View 
          entering={FadeIn.duration(800)}
          style={styles.endOfRoundContainer}
        >
          <Text style={styles.endIcon}>🗳️</Text>
          <Text style={styles.endTitle}>انتهت الأسئلة!</Text>
          <Text style={styles.endSubtitle}>صارت اللعبة مكشوفة؟{'\n'}حان وقت التصويت</Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, { marginTop: 40, width: '100%' }]}
            onPress={handleRoundEnd}
          >
            <Text style={styles.actionButtonText}>صوّت الآن!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  let askerName = '';
  let targetName = '';
  let badgeTitle = '';

  if (isGuidedRound) {
    badgeTitle = 'الجولة الأولى (الزامي) 🔵';
    const pair = guidedPairs[currentStep];
    if (pair) {
      askerName = players[pair[0]];
      targetName = players[pair[1]];
    }
  } else {
    badgeTitle = 'الجولة الثانية (اختيار حر) 🟢';
    askerName = players[currentAskerIndex];
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Animated.View 
          entering={FadeInDown.delay(100)}
          style={styles.roundBadge}
        >
          <Text style={styles.roundBadgeText}>{badgeTitle}</Text>
        </Animated.View>
        
        <Text style={styles.headerTitle}>دور السؤال لـ</Text>
        <Animated.Text 
          key={askerName}
          entering={FadeInDown}
          style={styles.askerName}
        >
          {askerName}
        </Animated.Text>
        
        <Text style={styles.headerSubtitle}>
          {isGuidedRound ? `اسأل: ${targetName}` : 'اختار مين تبي تسأل'}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {isGuidedRound ? (
          <Animated.View 
            key={`guided-${currentStep}`}
            entering={ZoomIn.duration(400)}
            exiting={FadeOut.duration(200)}
            style={styles.guidedInstructionCard}
          >
            <Text style={styles.endIcon}>💬</Text>
            <Text style={styles.endTitle}>{askerName}</Text>
            <Text style={styles.endSubtitle}>
              اسأل {targetName} سؤال ذكي{'\n'}عن الكلمة السرية!
            </Text>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn.duration(500)}>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={styles.sectionLabel}>اختار مين تسأل:</Text>
              <View style={[
                styles.counterBadge, 
                { 
                  backgroundColor: remaining <= 2 ? '#FED7D7' : '#C6F6D5',
                  borderColor: remaining <= 2 ? '#FEB2B2' : '#9AE6B4'
                }
              ]}>
                <Text style={[
                  styles.counterText,
                  { color: remaining <= 2 ? '#C53030' : '#2F855A' }
                ]}>
                  باقي {remaining} أسئلة
                </Text>
              </View>
            </View>

            {availableTargets.map((targetIndex, idx) => (
              <Animated.View
                key={targetIndex}
                entering={FadeInDown.delay(idx * 100)}
              >
                <Pressable
                  style={({ pressed }) => [
                    styles.targetCard,
                    pressed && styles.targetCardPressed,
                  ]}
                  onPress={() => handleNextStep(() => askPlayer(targetIndex))}
                >
                  <Text style={styles.targetEmoji}>
                    {PLAYER_EMOJIS[targetIndex % PLAYER_EMOJIS.length]}
                  </Text>
                  <Text style={styles.targetName}>{players[targetIndex]}</Text>
                </Pressable>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        {isGuidedRound ? (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleNextStep(nextGuidedStep)}
          >
            <Text style={styles.actionButtonText}>التالي</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionButton, 
              !canVote && styles.actionButtonDisabled
            ]}
            onPress={canVote ? () => handleNextStep(endQuestionPhaseEarly) : undefined}
            disabled={!canVote}
          >
            <Text style={styles.actionButtonText}>
              {canVote
                ? 'إنهاء والتصويت 🗳️'
                : `باقي ${wordsNeeded} أسئلة`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

import { TouchableOpacity } from 'react-native';

