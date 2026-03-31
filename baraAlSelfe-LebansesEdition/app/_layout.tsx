import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.appWrapper}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="add-players" options={{ headerShown: false }} />
          <Stack.Screen name="game-reveal" options={{ headerShown: false }} />
          <Stack.Screen name="question-phase" options={{ headerShown: false }} />
          <Stack.Screen name="results" options={{ headerShown: false }} />
          <Stack.Screen name="voting" options={{ headerShown: false }} />
        </Stack>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#f0f2f5' : '#ffffff',
    alignItems: 'center',
  },
  appWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 490,
    backgroundColor: '#ffffff',
    // Optional shadow for web to separate it from the background
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 20px rgba(0,0,0,0.1)'
    }),
    overflow: 'hidden',
  }
});
