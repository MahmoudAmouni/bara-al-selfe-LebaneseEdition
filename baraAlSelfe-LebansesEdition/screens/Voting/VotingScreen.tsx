import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/useGameStore';
import { styles } from './VotingScreen.styles';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  ZoomIn, 
  FadeOut,
  Layout
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

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

  const handleAction = async (callback: () => void) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    callback();
  };

  const handleVote = async (targetIndex: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const hasMore = submitVote(targetIndex);
    if (!hasMore) {
      router.replace('/results' as never);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Animated.View 
          key={isVoteRevealed ? 'voting-grid' : 'pass-phone'}
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(200)}
          layout={Layout.springify()}
          style={styles.card}
        >
          {!isVoteRevealed ? (
            <>
              <Text style={styles.voterStepText}>
                المصوّت {currentVoterIndex + 1} من {players.length}
              </Text>
              
              <Text style={styles.instructionTitle}>مرّق التلفون لـ</Text>
              <Text style={styles.playerName}>{currentVoter}</Text>
              
              <Animated.View 
                entering={ZoomIn.delay(300).springify()}
                style={styles.voterIconContainer}
              >
                <Text style={styles.voterIcon}>🗳️</Text>
              </Animated.View>
              
              <Text style={styles.votingSubtitle}>مستعد تصوّت؟</Text>
            </>
          ) : (
            <>
              <Animated.View entering={FadeInDown}>
                <Text style={styles.voterStepText}>
                  المصوّت {currentVoterIndex + 1} من {players.length}
                </Text>
                <Text style={styles.votingTitle}>دور {currentVoter}</Text>
                <Text style={styles.votingSubtitle}>مين برا السالفة؟ 🕵️‍♂️</Text>
              </Animated.View>
              
              <View style={styles.grid}>
                {players.map((player, index) => {
                  if (index === currentVoterIndex) return null;
                  return (
                    <Animated.View
                      key={index}
                      entering={FadeInDown.delay(index * 100).springify()}
                      style={styles.playerCard}
                    >
                      <TouchableOpacity
                        onPress={() => handleVote(index)}
                        activeOpacity={0.7}
                        style={{ alignItems: 'center', width: '100%' }}
                      >
                        <Text style={styles.playerEmoji}>
                          {PLAYER_EMOJIS[index % PLAYER_EMOJIS.length]}
                        </Text>
                        <Text 
                          style={styles.targetPlayerName}
                          numberOfLines={2}
                        >
                          {player}
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            </>
          )}
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        {!isVoteRevealed && (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleAction(toggleVoteReveal)}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>أنا {currentVoter}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

