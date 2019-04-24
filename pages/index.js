import { useState, useRef, useEffect } from 'react'
import Webcam from "react-webcam";
import jsQR from "jsqr";

const Home = () => {
  const [results, updateResults] = useState([])
  const [enableCamera, updateCamera] = useState(true)
  const webcam = useRef()
  const [imageUrl, updateImage] = useState('')
  // console.log(results)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!webcam.current) { return }
      const result = webcam.current.getScreenshot()
      if (!webcam.current.canvas) { return }
      const {width, height} = webcam.current.canvas
      const imageData = webcam.current.canvas.getContext('2d').getImageData(0, 0, width, height)
      const code = jsQR(imageData.data, imageData.width, imageData.height);
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

  return <div>
    <div>
      <button onClick={() => updateCamera(!enableCamera)}>toggleCamera</button>
    </div>
    {
      enableCamera &&
      <Webcam width={400} height={400} ref={webcam} />
    }
    <button onClick={() => {
      if (!webcam.current) { return }
      // const result = webcam.current.getScreenshot()
      // updateImage(result)
      // console.log(webcam.current)
      const {width, height} = webcam.current.canvas
      const imageData = webcam.current.canvas.getContext('2d').getImageData(0, 0, width, height)
      // console.log(imageData)
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      // console.log(results)
      if (code) {
        // console.log(code)
        console.log([...results, code.data])
        console.log(results, code.data)
        updateResults([...results, code.data])

      }
    }}>Capture</button>
    {
      JSON.stringify(results)
    }
    {
      results.map(result => {
        return <p>{ result }</p>
      })
    }
  </div>
}

export default Home