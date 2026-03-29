import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  playerItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  playerInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  playerNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFE0B2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  playerNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D84315',
  },
  playerName: {
    fontSize: 18,
    color: '#4E342E',
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#FF6B6B',
  },
});
