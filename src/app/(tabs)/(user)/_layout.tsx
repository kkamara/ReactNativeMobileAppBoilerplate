import React from 'react';
import { Tabs, } from "expo-router";
import HelloFromServerProvider from '@/providers/HelloFromServerProvider';

export default function ExampleLayout() {
  return <HelloFromServerProvider>
    <Tabs backBehavior="history" screenOptions={{ tabBarStyle: { display: 'none', }, }}>
      <Tabs.Screen
        name="customScreen"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="customScreen2"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  </HelloFromServerProvider>;
}