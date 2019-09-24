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
import { ArrowView, Pixel } from './ArrowView'
import Heart from './Heart'

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
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  }

  render() {
    return (
      <SafeAreaView
        style={{
          // flexGrow: 1,
          backgroundColor: '#F5FCFF',
          // backgroundColor: 'transparent',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <ArrowView
          from={new Pixel(this.state.start.x, this.state.start.y)}
          to={new Pixel(this.state.end.x, this.state.end.y)}
        />
        <DraggableView
          onChanges={(x, y) =>
            this.setState({
              start: { x, y },
            })
          }
          text="Start"
        />
        <DraggableView
          onChanges={(x, y) =>
            this.setState({
              end: { x, y },
            })
          }
          text="End"
        />
        {/* <ArrowView from={this.state.start} to={this.state.end} /> */}
      </SafeAreaView>
    )
  }
}
