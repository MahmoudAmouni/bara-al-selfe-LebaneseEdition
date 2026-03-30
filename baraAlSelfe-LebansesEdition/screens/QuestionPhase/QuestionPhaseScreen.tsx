import React, { useEffect } from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './QuestionPhaseScreen.styles';

const PLAYER_EMOJIS = ['🧑', '👩', '🧔', '👱', '🧕', '👨', '🧒', '👧'];

export default function QuestionPhaseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    players,
    round,
    currentStep,
    guidedPairs,
    currentAskerIndex,
    round2QuestionCount,
    nextGuidedStep,
    askPlayer,
    getAvailableTargets,
    canEndEarly,
    endQuestionPhaseEarly,
    isQuestionPhaseOver,
  } = useGameStore();

  const phaseOver = isQuestionPhaseOver();
  const isGuidedRound = round === 1;
  const availableTargets = getAvailableTargets();

  const handleRoundEnd = () => {
    Alert.alert('تصويت!', 'وقت التصويت! اختاروا مين برا السالفة.', [
      { text: 'حسناً', onPress: () => router.replace('/' as never) }
    ]);
  };

  const forceEnd = () => {
    endQuestionPhaseEarly();
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

  const n = players.length;
  const maxLimit = n + Math.floor(n / 2);
  const remaining = maxLimit - round2QuestionCount;

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
        contentContainerStyle={{ paddingBottom: 100 }}
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
              <View style={{ backgroundColor: remaining <= 1 ? '#FFEBEE' : '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ fontSize: 13, color: remaining <= 1 ? '#D32F2F' : '#2E7D32', fontWeight: 'bold' }}>
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

      <View style={[styles.footer, { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF3E0', paddingBottom: insets.bottom + 10 }]}>
        {isGuidedRound ? (
          <Pressable style={styles.actionButton} onPress={nextGuidedStep}>
            <Text style={styles.actionButtonText}>التالي</Text>
          </Pressable>
        ) : (
          canEndEarly() && (
            <Pressable 
              style={[styles.actionButton, { backgroundColor: '#D84315' }]} 
              onPress={forceEnd}
            >
              <Text style={styles.actionButtonText}>إنهاء والتصويت 🗳️</Text>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
}
