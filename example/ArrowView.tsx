import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, ART } from 'react-native'
const { Surface, Shape, Group, Path, Transform, LinearGradient, ClippingRectangle } = ART
const { width, height } = Dimensions.get('window')

type Pixel = { x: number; y: number }
interface ArrowViewProps {
  from: Pixel
  to: Pixel
}

const surfaceWidth = Dimensions.get('window').width - 16
const surfaceHeight = surfaceWidth
const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#d39494',
  },
})
export class ArrowView extends PureComponent<ArrowViewProps> {
  zero: Pixel = { x: 0, y: 0 }
  render() {
    const { from = this.zero, to = this.zero } = this.props
    return (
      <View style={{ zIndex: 100, borderColor: 'red', borderWidth: 1 }}>
        <Surface width={surfaceWidth} height={surfaceHeight}>
          <Group x={surfaceWidth / 2 - 90} y={surfaceHeight / 2 - 70}>
            <Shape d={new Path().moveTo(0, 0).lineTo(100, 100)} strokeWidth={2} stroke="#000" />
          </Group>
        </Surface>
      </View>
    )
  }
}
