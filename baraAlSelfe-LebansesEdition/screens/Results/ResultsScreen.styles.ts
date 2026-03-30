import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#D84315',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#8D6E63',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
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
  statusIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    color: '#4E342E',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 16,
  },
  spyReveal: {
    padding: 20,
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  spyLabel: {
    fontSize: 14,
    color: '#D84315',
    fontWeight: '700',
    marginBottom: 4,
  },
  spyName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4E342E',
  },
  wordReveal: {
    fontSize: 16,
    color: '#8D6E63',
    marginTop: 12,
    fontStyle: 'italic',
  },
  votingTable: {
    width: '100%',
    marginBottom: 24,
  },
  voteRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  votedName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4E342E',
  },
  voteCount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#D84315',
  },
  punishmentCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 24,
    padding: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFCDD2',
    alignItems: 'center',
  },
  punishmentTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#D32F2F',
    marginBottom: 8,
  },
  punishmentText: {
    fontSize: 20,
    color: '#B71C1C',
    textAlign: 'center',
    fontWeight: '600',
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
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
});
