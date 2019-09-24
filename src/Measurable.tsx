import React, { PureComponent } from 'react'
import { View } from 'react-native'

export type DraggableViewProps = {
  onMeasure: (x: number, y: number, width: number, height: number) => void
}

export class Measurable extends PureComponent<DraggableViewProps> {
  marker: View | null = null

  render() {
    const { onMeasure } = this.props
    return (
      <View
        style={{ borderColor: 'red', borderWidth: 1 }}
        ref={ref => (this.marker = ref)}
        onLayout={({ nativeEvent }) => {
          console.warn('onMeasure')

          if (this.marker) {
            this.marker.measure((x, y, width, height, pageX, pageY) => {
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
