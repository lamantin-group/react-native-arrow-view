import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, ART } from 'react-native'
const { Surface, Shape, Group, Path, Transform, LinearGradient, ClippingRectangle } = ART
const { width, height } = Dimensions.get('window')

type Pixel = { x: number; y: number }
interface ArrowViewProps {
  from: Pixel
  to: Pixel
}

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
      <View
        pointerEvents="none"
        style={{ zIndex: 100, borderColor: 'red', borderWidth: 1, position: 'absolute' }}>
        <Surface width={width} height={height}>
          <Group>
            <Shape
              d={new Path().moveTo(from.x, from.y).lineTo(to.x, to.y)}
              strokeWidth={2}
              stroke="#000"
            />
          </Group>
        </Surface>
      </View>
    )
  }
}
