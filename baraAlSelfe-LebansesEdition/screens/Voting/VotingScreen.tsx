import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './VotingScreen.styles';

const PLAYER_EMOJIS = ['🧑', '👩', '🧔', '👱', '🧕', '👨', '🧒', '👧'];

export default function VotingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { 
    players, 
    currentVoterIndex, 
    isVoteRevealed, 
    toggleVoteReveal, 
    submitVote,
    initVotingPhase 
  } = useGameStore();

  useEffect(() => {
    initVotingPhase();
  }, []);

  const currentVoter = players[currentVoterIndex];

  const handleVote = (targetIndex: number) => {
    const hasMore = submitVote(targetIndex);
    if (!hasMore) {
      router.replace('/results' as never);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <View style={styles.card}>
          {!isVoteRevealed ? (
            <>
              <Text style={styles.instructionTitle}>مرّق التلفون لـ</Text>
              <Text style={styles.playerName}>{currentVoter}</Text>
              <Text style={styles.voterIcon}>🗳️</Text>
              <Text style={styles.votingSubtitle}>مستعد تصوّت؟</Text>
            </>
          ) : (
            <>
              <Text style={styles.votingTitle}>دور {currentVoter}</Text>
              <Text style={styles.votingSubtitle}>مين برا السالفة؟ 🕵️‍♂️</Text>
              
              <View style={styles.grid}>
                {players.map((player, index) => {
                  if (index === currentVoterIndex) return null;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.playerCard}
                      onPress={() => handleVote(index)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.playerEmoji}>
                        {PLAYER_EMOJIS[index % PLAYER_EMOJIS.length]}
                      </Text>
                      <Text style={styles.targetPlayerName}>{player}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        {!isVoteRevealed && (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={toggleVoteReveal}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>أنا {currentVoter}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
