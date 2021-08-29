import { AddCamera } from "../components/AddCamera"
function AddCameraView(props) {
  return (
    <div className="HomeView">
      <div className="container ">
        <div className="row justify-content-around">
          <div className="col-sm marginSidesClass">
            <br /> <h1>Add new Camera </h1>
            <AddCamera />
          </div>
        </div>
      </div>
    </div>
  )
}

// const styles = {}

export default AddCameraView
