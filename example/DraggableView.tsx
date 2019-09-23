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
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),

      onPanResponderRelease: (e, { vx, vy }) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset()
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start()
      },
    })
  }

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
    const imageStyle = { transform: [{ translateX }, { translateY }, { rotate }, { scale }] }

    return (
      <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
        <View style={{ backgroundColor: '#ffcc00', borderRadius: 4, padding: 16 }}>
          <Text>{text}</Text>
        </View>
      </Animated.View>
    )
  }
}
