import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, ART } from 'react-native'
const { Surface, Shape, Group, Path, Transform, LinearGradient, ClippingRectangle } = ART
const { width, height } = Dimensions.get('window')

export class Pixel {
  x: number
  y: number

  constructor(x: any, y: any) {
    this.x = +x
    this.y = +y
  }

  toTheLeftOf(another: Pixel): boolean {
    return this.x < another.x
  }

  above(another: Pixel): boolean {
    return this.y < another.y
  }
}

interface ArrowViewProps {
  from: Pixel
  to: Pixel
}

const maxOf = (first: number, second: number) => Math.max(first, second)

export class ArrowView extends PureComponent<ArrowViewProps> {
  zero: Pixel = new Pixel(0, 0)

  deltaX = 180

  render() {
    const line = new Path()
    const { from = this.zero, to = this.zero } = this.props

    const curveX = maxOf(
      0,
      from.toTheLeftOf(to)
        ? from.x + (to.x - from.x) / 2 - this.deltaX
        : to.x + (to.x - to.x) / 2 - this.deltaX
    )

    const curveY = maxOf(
      0,
      to.above(from)
        ? to.y + (from.y - to.y) / 2 //
        : to.y - (to.y - from.y) / 2 //
    )
    const curve = new Pixel(curveX, curveY)

    line.moveTo(from.x, from.y)
    line.curveTo(curve.x, curve.y, to.x, to.y)
    return (
      <View
        pointerEvents="none"
        style={{ zIndex: 100, borderColor: 'red', borderWidth: 1, position: 'absolute' }}>
        <Surface width={width} height={height}>
          <Group>
            <Shape d={line} strokeWidth={2} stroke="#000" />
            <Circle center={from} radius={4} />
            {__DEV__ && <Circle center={curve} radius={4} />}
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
