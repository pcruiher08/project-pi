import MaterialTable from "material-table"
import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHistory } from "react-router-dom"

const EventTable = (props) => {
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const columns = [
    { title: "Id", field: "_id" },
    { title: "Datetime", field: "datetime" },
    { title: "Latitude", field: "latitude" },
    { title: "Longitude", field: "longitude" },
    { title: "Type", field: "type" },
  ]
  const { user } = useContext(AuthContext)
  const history = useHistory();

  const [sR, setSR] = useState({})

  useEffect(() => {
    // const val = getPending("test@test.com").then((resp) => {
    setData(props.events)
  }, [])

  return (
    <div className="row">
      <MaterialTable
        title="Events"
        data={props.events}
        onSelectionChange={(rows) => setSelectedRows(rows)}
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
    </div>
  )
}

const styles = {
  button: {
    backgroundColor: '#EF233C',
    color: 'white'
  }
}

export default EventTable
