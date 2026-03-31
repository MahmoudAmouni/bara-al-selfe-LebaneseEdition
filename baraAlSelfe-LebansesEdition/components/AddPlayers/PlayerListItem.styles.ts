import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  playerItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 4px 12px rgba(0,0,0,0.04)',
      },
    }),
  },
  playerInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  playerNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ED8936', // Vibrant orange
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#ED8936',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
      web: { boxShadow: '0px 2px 8px rgba(237, 137, 54, 0.3)' },
    })
  },
  playerNumberText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  playerName: {
    fontSize: 18,
    color: '#2D3748',
    fontWeight: '700',
  },
  removeButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
  },
});
