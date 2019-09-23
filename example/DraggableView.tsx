import React, { PureComponent, Component } from 'react'
import {
  View,
  Text,
  ViewStyle,
  PanResponder,
  Animated,
  StyleSheet,
  PanResponderInstance,
  Dimensions,
} from 'react-native'
import { string } from 'prop-types'
import { lchown } from 'fs'

interface DraggableViewProps {
  style?: ViewStyle
  text: string
}

interface DraggableViewState {
  pan: Animated.ValueXY
  scale: Animated.Value
}

const { width, height } = Dimensions.get('window')

export default class DraggableView extends Component<DraggableViewProps, DraggableViewState> {
  static defaultProps = {
    style: {},
    text: 'Drag me',
  }

  constructor(props: DraggableViewProps) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
    }

    if (props.refer) {
      this.props.refer(this)
    }
  }

  _panResponder: PanResponderInstance = null

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
        Animated.spring(this.state.scale, { toValue: 1.1, friction: 3 }).start()
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: (event, gesture) => {
        const { locationX, locationY } = event.nativeEvent
        const dx = this.state.pan.x
        const dy = this.state.pan.y
        Animated.event([null, { dx: dx, dy: dy }])(event, gesture)
        // console.warn('dx = ', dx, 'dy = ', dy)
        // this.setState({
        //   layoutX: dx._value,
        //   layoutY: dy._value,
        // })
        this.setState({
          x: locationX,
          y: locationY,
        })
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset()
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start()
      },
    })
  }

  layoutX = 0
  layoutY = 0

  render() {
    // Destructure the value of pan from the state
    const { pan, scale } = this.state
    const { text } = this.props

    if (!pan) return null
    if (!this._panResponder) return null

    // Calculate the x and y transform from the pan value
    const [translateX, translateY] = [pan.x, pan.y]

    const rotate = '0deg'

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    const imageStyle = { transform: [{ translateX }, { translateY }, { rotate }] }

    return (
      <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
        <View
          style={{ height: 100, minWidth: 200, maxWidth: 200 }}
          ref={ref => {
            this.marker = ref
          }}
          onLayout={({ nativeEvent }) => {
            if (this.marker) {
              this.marker.measure((x, y, width, height, pageX, pageY) => {
                this.setState({
                  x: Math.round(pageX).toFixed(0),
                  y: Math.round(pageY).toFixed(0),
                })
              })
            }
          }}
          style={{ backgroundColor: '#ffcc00', borderRadius: 4, padding: 16 }}>
          <Text>{text}</Text>
          <Text>x = {this.state.x}</Text>
          <Text>y = {this.state.y}</Text>
        </View>
      </Animated.View>
    )
  }
}
