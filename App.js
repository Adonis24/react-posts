import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AppLoading} from 'expo'
import { bootstrap } from './source/bootstrap';
import {AppNavigation} from './source/navigation/AppNavigation'

export default function App() {
  const [isReady,setIsReady] = useState(false)
  if (!isReady) {
    return (<AppLoading 
      startAsync={bootstrap}
      onFinish={()=>setIsReady(true)} 
      onError = {err=>console.log(err)}/>)
  }
  return (
    <AppNavigation/>
  );
}

