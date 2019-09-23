import React, { PureComponent } from 'react'
import { TouchableOpacity, Text } from 'react-native'

export class ArrowView extends PureComponent<{
  text: string
  onPress: () => void
}> {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          backgroundColor: '#e4e4e4',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 4,
        }}>
        <Text>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}
