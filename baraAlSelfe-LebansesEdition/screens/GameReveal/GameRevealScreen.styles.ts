import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    width: '100%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFE0B2',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  playerName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#D84315',
    textAlign: 'center',
    marginBottom: 30,
  },
  revealIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4E342E',
    textAlign: 'center',
    marginBottom: 10,
  },
  secretWordCard: {
    backgroundColor: '#FFE0B2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 15,
    marginTop: 20,
  },
  secretWordText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#D84315',
    textAlign: 'center',
  },
  spyText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  actionButton: {
    backgroundColor: '#D84315',
    borderRadius: 20,
    paddingVertical: 18,
    width: '100%',
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
    fontSize: 22,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: 'rgba(216, 67, 21, 0.1)',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#D84315',
  },
  secondaryButtonText: {
    color: '#D84315',
  },
});
