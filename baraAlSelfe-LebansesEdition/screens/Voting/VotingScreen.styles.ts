import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 10px 30px rgba(0,0,0,0.08)',
      },
    }),
  },
  instructionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#718096',
    marginBottom: 16,
    textAlign: 'center',
  },
  playerName: {
    fontSize: 46,
    fontWeight: '900',
    color: '#2D3748',
    marginBottom: 32,
    textAlign: 'center',
  },
  voterIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#ED8936',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  voterIcon: {
    fontSize: 64,
  },
  votingTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  votingSubtitle: {
    fontSize: 18,
    color: '#ED8936',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '800',
  },
  grid: {
    width: '100%',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerCard: {
    width: '47%',
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 4px 10px rgba(0,0,0,0.04)',
      },
    }),
  },
  playerCardPressed: {
    backgroundColor: '#F7FAFC',
    borderColor: '#ED8936',
    transform: [{ scale: 0.98 }],
  },
  playerEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  targetPlayerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2D3748',
    textAlign: 'center',
    marginTop: 4,
  },
  voterStepText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C05621',
    marginBottom: 16,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#FAFAFA',
  },
  actionButton: {
    backgroundColor: '#ED8936',
    borderRadius: 24,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#ED8936',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
        shadowColor: '#ED8936',
      },
      web: {
        boxShadow: '0px 8px 20px rgba(237, 137, 54, 0.3)',
      },
    }),
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
});
