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
import {
  View,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  Slider,
  TouchableOpacity,
} from 'react-native'
import { ArrowView, Pixel } from './ArrowView'
import Heart from './Heart'
import { Measurable } from 'react-native-library'
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
    colorIndex: 0,
    curveDelta: 50,
    width: 2,
  }

  colors = ['black', 'green', 'yellow', 'blue']

  render() {
    const { dashLength, dashGap, curveDelta, width } = this.state
    const color = this.colors[this.state.colorIndex]
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#F5FCFF',
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

          <Text>Curve delta (pivot) = {curveDelta}</Text>
          <Slider
            minimumValue={-100}
            maximumValue={100}
            value={curveDelta}
            onValueChange={value =>
              this.setState({
                curveDelta: value,
              })
            }
          />

          <Text>Arrow width = {width}</Text>
          <Slider
            minimumValue={0}
            maximumValue={16}
            value={width}
            onValueChange={value =>
              this.setState({
                width: value,
              })
            }
          />

          <TouchableOpacity
            onPress={() =>
              this.setState({
                colorIndex:
                  this.state.colorIndex >= this.colors.length - 1 ? 0 : this.state.colorIndex + 1,
              })
            }>
            <Text style={{ borderColor: '#4f4f4f', borderWidth: 1, padding: 8 }}>
              Color: {color}
            </Text>
          </TouchableOpacity>
        </View>

        <ArrowView
          dash={[dashLength, dashGap]}
          from={new Pixel(this.state.start.x, this.state.start.y)}
          to={new Pixel(this.state.end.x, this.state.end.y)}
          color={color}
          curveDelta={curveDelta}
          width={width}
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
