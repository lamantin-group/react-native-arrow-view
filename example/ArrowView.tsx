import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Surface, Shape, Group, Path, Transform, LinearGradient } from '@react-native-community/art'
const { width, height } = Dimensions.get('window')

type Pixel = { x: number; y: number }
interface ArrowViewProps {
  from: Pixel
  to: Pixel
}

export class ArrowView extends PureComponent<ArrowViewProps> {
  zero: Pixel = { x: 0, y: 0 }
  render() {
    const { from = this.zero, to = this.zero } = this.props
    return (
      <View style={{ position: 'absolute' }}>
        <Surface height={height} width={width}>
          <Shape d={new Path().moveTo(from.x, from.y).lineTo(to.x, to.y)} fill="#d39494" />
        </Surface>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#d39494',
  },
})
