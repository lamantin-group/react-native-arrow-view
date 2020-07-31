import { Color } from 'csstype'
import React, { PureComponent } from 'react'
import {  Dimensions, View } from 'react-native';
import { Surface, Shape, Group, Path } from "@react-native-community/art";

const window = Dimensions.get('window')
const screenWidth = window.width
const screenHeight = window.height

export interface Pixel {
  x: number
  y: number
}

class Point implements Pixel {
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
   * Enable debug mode for show:
   *
   * 1. border, when arrow can be rendered
   * 2. curve pivot point
   */
  debug: boolean

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
   * Caps for end of arrow lines
   */
  cap: 'butt' | 'round' | 'square'

  /**
   * Color of arrow
   *
   * @default #000
   */
  color: Color

  /**
   * Width of arrow
   *
   * @default 2
   */
  width: number
}

const maxOf = (first: number, second: number) => Math.max(first, second)

export class ArrowView extends PureComponent<ArrowViewProps> {
  zero: Point = new Point(0, 0)

  static defaultProps = {
    dash: [0, 0],
    curveDelta: 80,
    cap: 'round',
    color: '#000',
    width: 2,
    debug: false,
  }

  /**
   * Draw an arrowhead on a line on an canvas
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
  arrowheadPath(from: Pixel, to: Pixel, radius: number) {
    const path = new Path()
    const xCenter = to.x
    const yCenter = to.y

    let angle
    let x
    let y

    // path.beginPath()

    angle = Math.atan2(to.y - from.y, to.x - from.x)
    x = radius * Math.cos(angle) + xCenter
    y = radius * Math.sin(angle) + yCenter

    path.moveTo(x, y)

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + xCenter
    y = radius * Math.sin(angle) + yCenter

    path.lineTo(x, y)

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + xCenter
    y = radius * Math.sin(angle) + yCenter

    path.lineTo(x, y)

    path.close()
    return path
    // path.fill()
  }

  render() {
    const { curveDelta, dash, cap, color, width, debug } = this.props
    const line = new Path()
    const from = this.props.from ? new Point(this.props.from.x, this.props.from.y) : this.zero
    const to = this.props.to ? new Point(this.props.to.x, this.props.to.y) : this.zero

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
    const curve = new Point(curveX, curveY)

    line.moveTo(from.x, from.y)
    line.curveTo(curve.x, curve.y, to.x, to.y)

    return (
      <View
        pointerEvents="none"
        style={{
          zIndex: 100,
          borderColor: 'red',
          borderWidth: debug ? 1 : 0,
          position: 'absolute',
        }}>
        <Surface width={screenWidth} height={screenHeight}>
          <Group>
            <Shape d={line} strokeWidth={width} stroke={color} strokeDash={dash} strokeCap={cap} />
            <Circle center={from} radius={4} color={color} />
            <Shape
              d={this.arrowheadPath(from, to, 8)}
              strokeWidth={width}
              stroke={color}
              fill={color}
            />
            {debug && <Circle center={curve} radius={4} color={color} />}
          </Group>
        </Surface>
      </View>
    )
  }
}

export class Circle extends PureComponent<{
  radius: number
  center: Pixel
  color: Color
}> {
  render() {
    const { center, radius, color, ...rest } = this.props

    const circle = new Path()
      .move(center.x, center.y)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)

    return <Shape {...rest} d={circle} strokeWidth={2} stroke={color} fill={color} />
  }
}
