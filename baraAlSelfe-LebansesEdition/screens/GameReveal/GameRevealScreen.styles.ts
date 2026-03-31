import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    width: '100%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#ED8936',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
        shadowColor: '#ED8936',
      },
      web: {
        boxShadow: '0px 6px 16px rgba(237, 137, 54, 0.3)',
      },
    }),
  },
  spyIconContainer: {
    backgroundColor: '#FED7D7',
    ...Platform.select({
      ios: { shadowColor: '#E53E3E' },
      android: { shadowColor: '#E53E3E' },
      web: { boxShadow: '0px 6px 16px rgba(229, 62, 62, 0.3)' },
    }),
  },
  revealIcon: {
    fontSize: 64,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#C05621',
    textAlign: 'center',
    marginBottom: 8,
  },
  secretWordCard: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 36,
    paddingVertical: 20,
    borderRadius: 24,
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#FBD38D',
    width: '100%',
    alignItems: 'center',
  },
  secretWordText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#DD6B20',
    textAlign: 'center',
  },
  spyText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 16,
  },
  spySubText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#718096',
    textAlign: 'center',
    marginTop: 12,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 40,
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
