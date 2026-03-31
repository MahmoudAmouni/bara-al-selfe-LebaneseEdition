import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Super clean, slightly warm off-white
  },
  header: {
    paddingBottom: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 4,
    zIndex: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2D3748', // Strong modern dark grey
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: -1.5,
  },
  subtitleContainer: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#ED8936',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
        shadowColor: '#ED8936',
      },
      web: {
        boxShadow: '0px 4px 12px rgba(237, 137, 54, 0.3)',
      },
    }),
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ED8936',
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#A0AEC0',
    fontWeight: '700',
    textAlign: 'center',
  },
  listContent: {
    padding: 12,
  },
});
