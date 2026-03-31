import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
      },
    }),
  },
  roundBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  roundBadgeText: {
    color: '#ED8936',
    fontSize: 14,
    fontWeight: '800',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#718096',
    textAlign: 'right',
    marginBottom: 4,
  },
  askerName: {
    fontSize: 40,
    fontWeight: '900',
    color: '#2D3748',
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#ED8936',
    fontWeight: '800',
    textAlign: 'right',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4A5568',
    textAlign: 'right',
  },
  counterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '800',
  },
  targetCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 6px 16px rgba(0,0,0,0.06)',
      },
    }),
  },
  targetCardPressed: {
    backgroundColor: '#F7FAFC',
    transform: [{ scale: 0.98 }],
  },
  targetEmoji: {
    fontSize: 32,
    marginLeft: 20,
  },
  targetName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3748',
    flex: 1,
  },
  endOfRoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  endIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  endTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 12,
  },
  endSubtitle: {
    fontSize: 20,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#FAFAFA',
  },
  actionButton: {
    backgroundColor: '#ED8936',
    borderRadius: 24,
    paddingVertical: 20,
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
  actionButtonDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  guidedInstructionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
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
});
