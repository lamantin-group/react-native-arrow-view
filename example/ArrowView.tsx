import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, ART } from 'react-native'
import { Color } from 'csstype'
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

  /**
   * Dashed line config.
   *
   * Pass two digits by pattern [line-length, gap-between-lines]
   *
   * @example [3, 5]
   * @default [0, 0]
   */
  dash: number[]

  /**
   * Delta x position for curved pivot point.
   *
   * @default 80
   */
  curveDelta: number

  /**
   * Caps for end of line
   */
  cap: 'butt' | 'round' | 'square'

  /**
   * Color of arrow
   *
   * @default #000
   */
  color: Color
}

const maxOf = (first: number, second: number) => Math.max(first, second)

export class ArrowView extends PureComponent<ArrowViewProps> {
  zero: Pixel = new Pixel(0, 0)

  static defaultProps = {
    dash: [0, 0],
    curveDelta: 80,
    cap: 'round',
    color: '#000',
  }

  /**
   * Draw an arrowhead on a line on an HTML5 canvas.
   *
   * Based almost entirely off of http://stackoverflow.com/a/36805543/281460 with some modifications
   * for readability and ease of use.
   *
   * @param context The drawing context on which to put the arrowhead.
   * @param from A point, specified as an object with 'x' and 'y' properties, where the arrow starts
   *             (not the arrowhead, the arrow itself).
   * @param to   A point, specified as an object with 'x' and 'y' properties, where the arrow ends
   *             (not the arrowhead, the arrow itself).
   * @param radius The radius of the arrowhead. This controls how "thick" the arrowhead looks.
   */
  arrowheadPath(from: Pixel, to: Pixel, radius: number): Path {
    const path = new Path()
    const x_center = to.x
    const y_center = to.y

    let angle
    let x
    let y

    // path.beginPath()

    angle = Math.atan2(to.y - from.y, to.x - from.x)
    x = radius * Math.cos(angle) + x_center
    y = radius * Math.sin(angle) + y_center

    path.moveTo(x, y)

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + x_center
    y = radius * Math.sin(angle) + y_center

    path.lineTo(x, y)

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + x_center
    y = radius * Math.sin(angle) + y_center

    path.lineTo(x, y)

    path.close()
    return path
    // path.fill()
  }

  render() {
    const { curveDelta, dash, cap, color } = this.props
    const line = new Path()
    const { from = this.zero, to = this.zero } = this.props

    const curveX = maxOf(
      0,
      from.toTheLeftOf(to)
        ? from.x + (to.x - from.x) / 2 - curveDelta
        : to.x + (to.x - to.x) / 2 - curveDelta
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
            <Shape d={line} strokeWidth={2} stroke={color} strokeDash={dash} strokeCap={cap} />
            <Circle center={from} radius={4} />
            <Shape
              d={this.arrowheadPath(from, to, 8)}
              strokeWidth={2}
              stroke={color}
              fill={color}
            />
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
