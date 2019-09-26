import React, { PureComponent } from 'react'
import { View } from 'react-native'

export type MeasurableProps = {
  onMeasure: (x: number, y: number, width: number, height: number) => void
}

export class Measurable extends PureComponent<MeasurableProps> {
  marker: View | null = null

  render() {
    const { onMeasure } = this.props
    return (
      <View
        ref={ref => (this.marker = ref)}
        onLayout={() => {
          if (this.marker) {
            this.marker.measure((_x, _y, width, height, pageX, pageY) => {
              const mX = Math.round(pageX).toFixed(0)
              const mY = Math.round(pageY).toFixed(0)
              onMeasure && onMeasure(+mX, +mY, width, height)
            })
          }
        }}>
        {this.props.children}
      </View>
    )
  }
}
