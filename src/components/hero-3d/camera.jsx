import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { loadCurveFromJSON } from '../../utils/CurveMethods'

const ScrollFollowCamera = () => {
  const { camera, scene } = useThree()
  const [curve, setCurve] = useState(null)
  const scrollRef = useRef(0)

  // โหลด path จาก JSON
  useEffect(() => {
    async function loadPath() {
      const { curve, mesh } = await loadCurveFromJSON(scene, '/models/camera-path_closed.json')

      // ✅ เพิ่ม mesh เส้นทางเข้า scene เพื่อดู (optional)
      // scene.add(mesh)

      // ✅ เก็บ curve ไว้ใช้งาน
      setCurve(curve)

      // ตั้งตำแหน่งเริ่มต้นกล้อง
      const start = curve.getPointAt(0)
      const next = curve.getPointAt(0.01)
      camera.position.copy(start)
      camera.lookAt(next)
    }
    loadPath()
  }, [scene, camera])

  // ✅ ควบคุมการเลื่อนด้วย scroll
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault()
      const delta = e.deltaY * 0.0001 // ปรับความไว
      scrollRef.current = THREE.MathUtils.clamp(scrollRef.current + delta, 0, 1)
    }
    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  // ✅ อัปเดตตำแหน่งกล้องทุกเฟรม
  useFrame(() => {
    if (!curve) return

    const t = scrollRef.current
    const pos = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t)
    const lookAt = pos.clone().add(tangent)

    camera.position.copy(pos)
    camera.lookAt(lookAt)
  })

  return null
}

export default ScrollFollowCamera
