import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 24,
    minHeight: 180,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
      },
    }),
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    zIndex: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFF',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    marginTop: 10,
  },
  emojiText: {
    fontSize: 52,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 6,
      },
      web: {
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 6,
      },
    })
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: -0.5,
  },
  glassReflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    zIndex: 1,
    borderRadius: 24,
  }
});
