import MaterialTable from "material-table"
import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHistory } from "react-router-dom"

const CameraTable = (props) => {
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const columns = [
    { title: "Id", field: "_id" },
    { title: "Latitude", field: "latitude" },
    { title: "Longitude", field: "longitude" },
    { title: "Street", field: "street" },
  ]
  const { user } = useContext(AuthContext)
  const history = useHistory();

  function toggleModalWithData(selectedRow) {
    setSR(selectedRow)

    handleOpen()
  }

  const [showModal, setShowModal] = useState(false)

  const handleOpen = () => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  const [sR, setSR] = useState({})

  useEffect(() => {
    // const val = getPending("test@test.com").then((resp) => {
    setData(props.cameras)
  }, [])

  const onAddCamera = (e) => {
    history.push('add-camera')
  }

  return (
    <div className="row">
      <MaterialTable
        title="Cameras"
        data={props.cameras}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        onRowClick={(evt, selectedRow) => toggleModalWithData(selectedRow)}
        columns={columns}
        options={{
          selection: true,
          search: false,
          paging: true,
          filtering: true,
          exportButton: false,
        }}
        actions={[
          {
            icon: "search",
            tooltip: "These are all the selected rows",
          },
        ]}
      />

      <div className="col-lg-12">
        <button className="btn btn-flat float-center marginTopClass" style={styles.button} onClick={onAddCamera}>
          Add Camera
        </button>
      </div>
    </div>
  )
}

const styles = {
  button: {
    backgroundColor: '#EF233C',
    color: 'white'
  }
}

export default CameraTable
