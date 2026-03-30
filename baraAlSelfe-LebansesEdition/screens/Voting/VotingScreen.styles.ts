import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#D84315',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8D6E63',
    marginBottom: 16,
    textAlign: 'center',
  },
  playerName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#D84315',
    marginBottom: 24,
    textAlign: 'center',
  },
  voterIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  votingTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D84315',
    marginBottom: 8,
    textAlign: 'center',
  },
  votingSubtitle: {
    fontSize: 18,
    color: '#8D6E63',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '600',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFE0B2',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  playerCardPressed: {
    backgroundColor: '#FFF3E0',
    borderColor: '#D84315',
    transform: [{ scale: 0.98 }],
  },
  playerEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  targetPlayerName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4E342E',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  actionButton: {
    backgroundColor: '#D84315',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
});
