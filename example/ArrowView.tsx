import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, ART } from 'react-native'
const { Surface, Shape, Group, Path, Transform, LinearGradient, ClippingRectangle } = ART
const { width, height } = Dimensions.get('window')

export type Pixel = { x: number; y: number }

interface ArrowViewProps {
  from: Pixel
  to: Pixel
}

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
            <Circle center={from} radius={4} />
          </Group>
        </Surface>
      </View>
    )
  }
}

export class Circle extends PureComponent<{
  radius: number
  center: Pixel
}> {
  render() {
    const { center, radius, ...rest } = this.props

    const circle = new Path()
      .move(center.x, center.y)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)

    return <Shape {...rest} d={circle} strokeWidth={2} stroke="#000" />
  }
}
