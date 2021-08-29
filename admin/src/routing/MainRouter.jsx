import React from "react"
import { Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginView from "../views/LoginView"
import NonAuthRoute from "./NonAuthRoute"
import HomeView from "../views/HomeView"
import EventsView from "../views/EventsView"
import AddCameraView from "../views/AddCameraView"

function MainRouter() {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={HomeView} />
        <NonAuthRoute exact path="/login" component={LoginView} />
        <PrivateRoute exact path="/add-camera" component={AddCameraView} />
        <PrivateRoute exact path="/events" component={EventsView} />
      </Switch>
    </div>
  )
}

export default MainRouter
