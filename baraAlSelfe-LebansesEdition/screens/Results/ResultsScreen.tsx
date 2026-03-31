import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './ResultsScreen.styles';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  ZoomIn, 
  FadeOut,
  Layout
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const lebanesePunishments = [
  "دبكة لحالك بنص الغرفة لمدة دقيقة 💃",
  "تعمل قهوة لكل اللي عم يلعبوا ☕",
  "تحكي نكتة لبنانية بايخة وتضحك عليها لحالك 🙊",
  "ترقص تنورة على أغنية فيروز 🎶",
  "تقلد صوت فيروز هي وعم تغني 'شايف البحر شو كبير' 🌊",
  "تحكي متل الضيعة (لبناني قح) لمدة 5 دقايق 🚜",
  "تغسل جليات السهرة 🧼",
  "تعمل مساج للي ربح ضدك 💆‍♂️",
  "تبوس إيد كل حدا صوّت ضدك 💋",
  "توقف على إجر وحدة وتعد للـ 100 بالقلب 🦵",
  "تحط حامض بتمك وما تعمل أي تعبير 🍋",
  "تقلد شخصية سياسية لبنانية مشهورة 🎙️",
];

export default function ResultsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { players, votes, spyIndex, secretWord, resetGame, categoryId } = useGameStore();

  useEffect(() => {
    // Dramatic impact when landing on results
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const voteTally: Record<number, number> = {};
  players.forEach((_, index) => (voteTally[index] = 0));
  votes.forEach((targetIndex) => {
    if (targetIndex !== undefined) {
      voteTally[targetIndex]++;
    }
  });

  let maxVotes = -1;
  let accusedIndex = -1;
  let isTie = false;

  Object.entries(voteTally).forEach(([indexStr, count]) => {
    const index = parseInt(indexStr);
    if (count > maxVotes) {
      maxVotes = count;
      accusedIndex = index;
      isTie = false;
    } else if (count === maxVotes && count > 0) {
      isTie = true;
    }
  });

  const spyWon = isTie || accusedIndex !== spyIndex;
  const spyName = players[spyIndex];
  
  const randomPunishment = lebanesePunishments[Math.floor(Math.random() * lebanesePunishments.length)];

  const handleRestart = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetGame();
    router.replace(`/add-players?categoryId=${categoryId}` as never);
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Animated.Text entering={FadeInDown} style={styles.title}>
          النتائج النهائيّة
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(100)} style={styles.subtitle}>
          مين كان برا السالفة؟
        </Animated.Text>

        <Animated.View 
          entering={ZoomIn.duration(600).springify()}
          style={styles.resultCard}
        >
          <Animated.View 
            entering={ZoomIn.delay(300).springify()}
            style={[
              styles.statusIconContainer, 
              { backgroundColor: spyWon ? '#FFF5F5' : '#F0FFF4' }
            ]}
          >
            <Text style={styles.statusIcon}>{spyWon ? '🧛‍♂️' : '🏆'}</Text>
          </Animated.View>

          <Text style={[
            styles.statusTitle, 
            { color: spyWon ? '#E53E3E' : '#38A169' }
          ]}>
            {spyWon ? 'برا السالفة ربح!' : 'كشفتوه يا أبطال!'}
          </Text>
          
          <Text style={styles.statusText}>
            {isTie 
              ? 'في تعادل بالأصوات! حسب قوانين اللعبة، برا السالفة هو اللي بيربح بالتعادل.'
              : spyWon 
                ? `صوّتوا لـ ${players[accusedIndex]}، بس طلع هوّي اللعيب وضحك عليكن!` 
                : `فعلاً ${players[accusedIndex]} هو اللي كان برا السالفة!`
            }
          </Text>

          <Animated.View 
            entering={FadeIn.delay(500)}
            style={styles.spyReveal}
          >
            <Text style={styles.spyLabel}>برا السالفة كان:</Text>
            <Text style={styles.spyName}>{spyName}</Text>
            <Text style={styles.wordReveal}>الكلمة كانت: {secretWord}</Text>
          </Animated.View>
        </Animated.View>

        <View style={styles.votingTable}>
          <Text style={styles.voteSectionTitle}>توزيع الأصوات:</Text>
          {players.map((player, index) => (
            <Animated.View 
              key={index} 
              entering={FadeInDown.delay(600 + index * 100)}
              style={styles.voteRow}
            >
              <Text style={styles.votedName}>{player}</Text>
              <Text style={styles.voteCountCount}>{voteTally[index]} 👍</Text>
            </Animated.View>
          ))}
        </View>

        <Animated.View 
          entering={FadeInDown.delay(1000)}
          style={styles.punishmentCard}
        >
          <Text style={styles.punishmentTitle}>🔥 العقاب الشنيع 🔥</Text>
          <Text style={styles.punishmentText}>{randomPunishment}</Text>
          <Text style={styles.punishmentTarget}>
            {spyWon ? 'العقاب للكل ما عدا برا السالفة!' : `العقاب لـ ${spyName} لحاله!`}
          </Text>
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleRestart}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>لعبة جديدة 🔄</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

