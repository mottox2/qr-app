import { useState, useRef } from 'react'
import Webcam from "react-webcam";
import jsQR from "jsqr";

const Home = () => {
  const [results, updateResults] = useState([])
  const webcam = useRef()
  const [imageUrl, updateImage] = useState('')
  console.log(results)
  return <div>
    <Webcam width={400} height={400} ref={webcam} />
    <button onClick={() => {
      if (!webcam.current) { return }
      const result = webcam.current.getScreenshot()
      console.log(webcam.current)
      const {width, height} = webcam.current.canvas
      updateImage(result)
      const imageData = webcam.current.canvas.getContext('2d').getImageData(0, 0, width, height)
      console.log(imageData)
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
      console.log(code)
      updateResults([...results, code.data])

      }
    }}>Capture</button>
    {
      imageUrl.length > 0 && <img src={imageUrl}/>
    }
    {
      results.map(result => {
        return <p>{ result }</p>
      })
    }
  </div>
}

export default Home