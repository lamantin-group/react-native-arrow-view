import React from 'react'
import { StyleSheet, Dimensions, View, ART } from 'react-native'
const {
  Surface,
  LinearGradient,
  Path,
  Text,
  Shape,
  Group,
  RadialGradient,
  // } from '@react-native-community/art'
} = ART

const HEART_SHAPE = 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z'

export default function Heart() {
  const surfaceWidth = Dimensions.get('window').width - 16
  const surfaceHeight = surfaceWidth

  const path = new Path()
    .moveTo(0, 0)
    .lineTo(100, 100)

  return (
    <View style={{ zIndex: 100, borderColor: 'red', borderWidth: 1 }}>
      <Surface visible={true} opacity={1.0} width={surfaceWidth} height={surfaceHeight}>
        <Group visible={true} opacity={1.0} x={surfaceWidth / 2 - 90} y={surfaceHeight / 2 - 70}>
          {/* <Shape visible={true} opacity={1.0} strokeWidth={12} stroke="#000" d={path} /> */}
          <Shape visible={true} opacity={1.0} d={path} strokeWidth={12} stroke="#000" />
        </Group>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'transparent',
  },
})
