import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#FFE0B2',
    borderBottomWidth: 1,
    borderBottomColor: '#FFCC80',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roundBadge: {
    alignSelf: 'flex-end',
    backgroundColor: '#D84315',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  roundBadgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8D6E63',
    textAlign: 'right',
    marginBottom: 4,
  },
  askerName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#D84315',
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8D6E63',
    fontWeight: '600',
    textAlign: 'right',
    marginTop: 6,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8D6E63',
    textAlign: 'right',
    marginBottom: 16,
  },
  targetCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#FFE0B2',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  targetCardPressed: {
    backgroundColor: '#FFF3E0',
    borderColor: '#D84315',
    transform: [{ scale: 0.98 }],
  },
  targetEmoji: {
    fontSize: 30,
    marginLeft: 16,
  },
  targetName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4E342E',
  },
  endOfRoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  endIcon: {
    fontSize: 70,
    marginBottom: 20,
  },
  endTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D84315',
    textAlign: 'center',
    marginBottom: 10,
  },
  endSubtitle: {
    fontSize: 18,
    color: '#8D6E63',
    textAlign: 'center',
    lineHeight: 26,
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
    fontSize: 22,
    fontWeight: '800',
  },
});
