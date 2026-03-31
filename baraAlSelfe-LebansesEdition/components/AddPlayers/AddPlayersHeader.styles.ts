import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  backButton: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
      },
    }),
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2D3748',
  },
  categoryBadge: {
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#FED7E2',
  },
  categoryBadgeText: {
    color: '#D53F8C',
    fontSize: 14,
    fontWeight: '800',
  },
});
