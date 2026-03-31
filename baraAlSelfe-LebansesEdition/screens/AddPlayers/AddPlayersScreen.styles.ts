import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  playerList: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#A0AEC0',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  nextButton: {
    backgroundColor: '#ED8936',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#ED8936',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
        shadowColor: '#ED8936',
      },
      web: {
        boxShadow: '0px 6px 16px rgba(237, 137, 54, 0.4)',
      },
    }),
  },
  nextButtonDisabled: {
    backgroundColor: '#E2E8F0',
    ...Platform.select({
      ios: { shadowOpacity: 0 },
      android: { elevation: 0 },
      web: { boxShadow: 'none' },
    }),
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
