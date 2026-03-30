import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './ResultsScreen.styles';

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
  const { players, votes, spyIndex, secretWord, resetGame } = useGameStore();

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

  const handleRestart = () => {
    resetGame();
    router.replace('/' as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>النتائج النهائيّة</Text>
        <Text style={styles.subtitle}>مين كان برا السالفة؟</Text>

        <View style={styles.resultCard}>
          <Text style={styles.statusIcon}>{spyWon ? '🧛‍♂️' : '🏆'}</Text>
          <Text style={[styles.statusTitle, { color: spyWon ? '#D84315' : '#2E7D32' }]}>
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

          <View style={styles.spyReveal}>
            <Text style={styles.spyLabel}>برا السالفة كان:</Text>
            <Text style={styles.spyName}>{spyName}</Text>
            <Text style={styles.wordReveal}>الكلمة كانت: {secretWord}</Text>
          </View>
        </View>

        <View style={styles.votingTable}>
          <Text style={[styles.subtitle, { marginBottom: 12, textAlign: 'right' }]}>توزيع الأصوات:</Text>
          {players.map((player, index) => (
            <View key={index} style={styles.voteRow}>
              <Text style={styles.votedName}>{player}</Text>
              <Text style={styles.voteCount}>{voteTally[index]} 👍</Text>
            </View>
          ))}
        </View>

        <View style={styles.punishmentCard}>
          <Text style={styles.punishmentTitle}>🔥 العقاب الشنيع 🔥</Text>
          <Text style={styles.punishmentText}>{randomPunishment}</Text>
          <Text style={{ marginTop: 12, fontSize: 12, color: '#D32F2F', fontWeight: 'bold' }}>
            {spyWon ? 'العقاب للكل ما عدا برا السالفة!' : `العقاب لـ ${spyName} لحاله!`}
          </Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleRestart}>
          <Text style={styles.actionButtonText}>لعبة جديدة 🔄</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
