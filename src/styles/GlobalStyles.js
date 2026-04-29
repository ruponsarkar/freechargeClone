// src/styles/GlobalStyles.js
import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#333',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    padding: 12,
    borderRadius: 8,
  },

  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#ff6347',
  },
  dangerButton: {
    backgroundColor: '#FF0000',
  },


});
