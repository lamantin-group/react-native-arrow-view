import React, { PureComponent } from 'react'
import { View } from 'react-native'

export type DraggableViewProps = {
  onMeasure: (x: number, y: number, width: number, height: number) => void
}

export class Measurable extends PureComponent<DraggableViewProps> {
  onLayout = ({ nativeEvent }) => {
    console.warn('onMeasure')

    if (this.marker) {
      this.marker.measure((x, y, width, height, pageX, pageY) => {
        const mX = Math.round(pageX).toFixed(0)
        const mY = Math.round(pageY).toFixed(0)
        onMeasure && onMeasure(mX, mY, width, height)
      })
    }
  }

  render() {
    const { onMeasure } = this.props
    const childrens = React.Children.map(this.props.children, child => {
      child.props.onLayout = this.onLayout
      child.onLayout = this.onLayout
      return child
    })
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
              onMeasure && onMeasure(mX, mY, width, height)
            })
          }
        }}>
        {childrens}
      </View>
    )
  }
}
