import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './QuestionPhaseScreen.styles';

const PLAYER_EMOJIS = ['🧑', '👩', '🧔', '👱', '🧕', '👨', '🧒', '👧'];

export default function QuestionPhaseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  
  const players         = useGameStore((s) => s.players);
  const round           = useGameStore((s) => s.round);
  const currentStep     = useGameStore((s) => s.currentStep);
  const guidedPairs     = useGameStore((s) => s.guidedPairs);
  const currentAskerIndex   = useGameStore((s) => s.currentAskerIndex);
  const previousAskerIndex  = useGameStore((s) => s.previousAskerIndex);
  const round2QuestionCount = useGameStore((s) => s.round2QuestionCount);
  const nextGuidedStep  = useGameStore((s) => s.nextGuidedStep);
  const askPlayer       = useGameStore((s) => s.askPlayer);
  const endQuestionPhaseEarly = useGameStore((s) => s.endQuestionPhaseEarly);

  const n = players.length;
  const isGuidedRound = round === 1;

  
  const minRequired   = Math.min(1, n - 1); 
  const maxLimit      = n + Math.floor(n / 2);
  const remaining     = Math.max(0, maxLimit - round2QuestionCount);
  const wordsNeeded   = Math.max(0, minRequired - round2QuestionCount);
  const canVote       = round === 2 && round2QuestionCount >= minRequired;

  const phaseOver     = round === 3 || remaining <= 0;

  const availableTargets = players
    .map((_, index) => index)
    .filter((index) => {
      if (round === 2) {
        return index !== currentAskerIndex && index !== previousAskerIndex;
      }
      return false;
    });

  const handleRoundEnd = () => {
    router.replace('/voting' as never);
  };

  
  if (phaseOver) {
    return (
      <View style={styles.container}>
        <View style={styles.endOfRoundContainer}>
          <Text style={styles.endIcon}>🗳️</Text>
          <Text style={styles.endTitle}>انتهت الأسئلة!</Text>
          <Text style={styles.endSubtitle}>حان وقت التصويت</Text>
          <Pressable
            style={[styles.actionButton, { marginTop: 40, width: '80%' }]}
            onPress={handleRoundEnd}
          >
            <Text style={styles.actionButtonText}>صوّت الآن !</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  let askerName  = '';
  let targetName = '';
  let badgeTitle = '';

  if (isGuidedRound) {
    badgeTitle = 'الجولة الأولى (الزامي) 🔵';
    const pair = guidedPairs[currentStep];
    if (pair) {
      askerName  = players[pair[0]];
      targetName = players[pair[1]];
    }
  } else {
    badgeTitle = 'الجولة الثانية (اختيار حر) 🟢';
    askerName  = players[currentAskerIndex];
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.roundBadge}>
          <Text style={styles.roundBadgeText}>{badgeTitle}</Text>
        </View>
        <Text style={styles.headerTitle}>دور السؤال لـ</Text>
        <Text style={styles.askerName}>{askerName}</Text>
        <Text style={styles.headerSubtitle}>
          {isGuidedRound ? `اسأل: ${targetName}` : 'اختار مين تبي تسأل'}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {isGuidedRound ? (
          <View style={styles.endOfRoundContainer}>
            <Text style={styles.endIcon}>💬</Text>
            <Text style={styles.endTitle}>{askerName}</Text>
            <Text style={styles.endSubtitle}>
              اسأل {targetName} سؤال عن الكلمة السرية!
            </Text>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionLabel}>اختار مين تسأل:</Text>
              <View style={{ backgroundColor: remaining <= 2 ? '#FFEBEE' : '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ fontSize: 13, color: remaining <= 2 ? '#D32F2F' : '#2E7D32', fontWeight: 'bold' }}>
                  باقي {remaining} أسئلة
                </Text>
              </View>
            </View>

            {availableTargets.map((targetIndex) => (
              <Pressable
                key={targetIndex}
                style={({ pressed }) => [
                  styles.targetCard,
                  pressed && styles.targetCardPressed,
                ]}
                onPress={() => askPlayer(targetIndex)}
              >
                <Text style={styles.targetEmoji}>
                  {PLAYER_EMOJIS[targetIndex % PLAYER_EMOJIS.length]}
                </Text>
                <Text style={styles.targetName}>{players[targetIndex]}</Text>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>

      {/* Footer always visible in Round 1 or Round 2 */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        {isGuidedRound ? (
          <Pressable style={styles.actionButton} onPress={nextGuidedStep}>
            <Text style={styles.actionButtonText}>التالي</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.actionButton, { backgroundColor: canVote ? '#D84315' : '#BCAAA4' }]}
            onPress={canVote ? endQuestionPhaseEarly : undefined}
            disabled={!canVote}
          >
            <Text style={styles.actionButtonText}>
              {canVote
                ? 'إنهاء والتصويت 🗳️'
                : `باقي ${wordsNeeded} أسئلة للتصويت`}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
