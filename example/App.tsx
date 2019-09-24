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
import { View, NativeModules, SafeAreaView, StyleSheet, Text, Slider } from 'react-native'
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
    dashLength: 4,
    dashGap: 8,
  }

  render() {
    const { dashLength, dashGap } = this.state
    return (
      <SafeAreaView
        style={{
          // flexGrow: 1,
          backgroundColor: '#F5FCFF',
          // backgroundColor: 'transparent',
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            paddingHorizontal: 16,
          }}>
          <Text>Dash length = {dashLength}</Text>
          <Slider
            minimumValue={0}
            maximumValue={20}
            value={dashLength}
            onValueChange={value =>
              this.setState({
                dashLength: value,
              })
            }
          />

          <Text>Dash gap = {dashGap}</Text>
          <Slider
            minimumValue={0}
            maximumValue={20}
            value={dashGap}
            onValueChange={value =>
              this.setState({
                dashGap: value,
              })
            }
          />
        </View>

        <ArrowView
          dash={[dashLength, dashGap]}
          from={new Pixel(this.state.start.x, this.state.start.y)}
          to={new Pixel(this.state.end.x, this.state.end.y)}
        />

        <View style={{ alignItems: 'center' }}>
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
        </View>
      </SafeAreaView>
    )
  }
}
