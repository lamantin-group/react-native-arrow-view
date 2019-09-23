/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import DraggableView from './DraggableView'
import React, { Component } from 'react'
import { NativeModules, SafeAreaView, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
  },
})
const { NativeLibrary } = NativeModules

export default class App extends Component {
  componentDidMount() {
    console.log(NativeModules)
    console.log(NativeLibrary)
  }

  state = {
    x: null,
    y: null,
  }

  render() {
    const { x, y } = this.state
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <DraggableView text="Start" />
        <DraggableView text="End" />
      </SafeAreaView>
    )
  }
}
