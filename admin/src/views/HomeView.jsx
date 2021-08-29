import React, { useState, useEffect, useContext } from "react"
import CameraTable from "../components/CameraTable"
import Map from "../components/Map"
import {getCameras} from "../services/cameras"

function HomeView(props) {

  const [cameras, setCameras] = useState([])

  useEffect(() => {
    getCameras().then((resp) => {
      console.log("GOT CAMERAS")
      console.log(resp)
      setCameras(resp)
    })
  }, [])
  return (
    <div className="HomeView">
      <div className="container" style={styles.container}>
        <CameraTable cameras={cameras}/>
        <Map elements={cameras} />
      </div>
    </div>
  )
}

const styles = {
  container: {
    justifyContent: 'center'
  }
}

export default HomeView
