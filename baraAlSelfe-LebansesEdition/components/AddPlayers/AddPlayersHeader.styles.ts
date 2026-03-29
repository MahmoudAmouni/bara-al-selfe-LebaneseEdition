import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#FFE0B2',
    borderBottomWidth: 1,
    borderBottomColor: '#FFCC80',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginBottom: 8,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 18,
    color: '#D84315',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D84315',
    textAlign: 'right',
  },
  categoryBadge: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  categoryBadgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
