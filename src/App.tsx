import React, { useState, useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import jsQR from 'jsqr'
import Layout from './layout'

const Home = () => {
  const [results, updateResults] = useState<String[]>([])
  const [enableCamera, updateCamera] = useState(true)
  const webcam = useRef<Webcam>(null)
  const [imageUrl, updateImage] = useState('')
  // console.log(results)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!webcam || webcam == undefined || !webcam.current) {
        return
      }
      const current: any = webcam.current
      const result = current.getScreenshot()
      if (!current.canvas) {
        return
      }
      const { width, height } = current.canvas
      const imageData = current.canvas.getContext('2d').getImageData(0, 0, width, height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        console.log(code)
        console.log(results, code.data)
        if (results[results.length - 1] != code.data) {
          updateResults([...results, code.data])
        }
      }
    }, 500)
    return () => {
      clearInterval(timer)
    }
  }, [results])

  return (
    <Layout>
      <div>
        <button onClick={() => updateCamera(!enableCamera)}>toggleCamera</button>
      </div>
      {enableCamera && <Webcam width={400} height={400} ref={webcam} />}
      {JSON.stringify(results)}
      {results.map(result => {
        return <p>{result}</p>
      })}
    </Layout>
  )
}

export default Home
