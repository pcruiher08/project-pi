import React, { useState, useEffect, useContext } from "react"
import EventTable from "../components/EventTable"
import Map from "../components/Map"
import {getEvents} from "../services/events"

function EventsView(props) {

  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents().then((resp) => {
        console.log(events)
      setEvents(resp)
    })
  }, [])
  return (
    <div className="EventsView">
      <div className="container" style={styles.container}>
        <EventTable events={events}/>
        <Map elements={events}/>
      </div>
    </div>
  )
}

const styles = {
  container: {
    justifyContent: 'center'
  }
}

export default EventsView
