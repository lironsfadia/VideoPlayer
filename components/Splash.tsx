import { useEffect, useRef } from "react"
import {Canvas} from "react-native-wgpu"

export const Splash = (props: { onFinish: () => void }) => {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = ref.current.getContext('webgpu')
  }, [])
  return <Canvas ref={ref} style={{flex: 1}}/>
}