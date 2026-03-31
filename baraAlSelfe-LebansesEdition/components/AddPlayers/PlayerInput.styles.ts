import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 6px 16px rgba(0,0,0,0.06)',
      },
    }),
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#2D3748',
    textAlign: 'right',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#ED8936',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
});
