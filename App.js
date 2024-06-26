import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { StatusBar } from "expo-status-bar";
import Navigation from "./StackNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <LinearGradient colors={["#fb6f92", "#ffb3c6"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 350 }} />
        <FontAwesome5
          style={{ textAlign: "center" }}
          name="itunes-note"
          size={100}
          color="white"
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
