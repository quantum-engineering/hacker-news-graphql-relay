import React, {Component} from "react"
import ReactDOM, {render} from "react-dom"
import Relay from "react-relay"

import { NewsStore, NewsRoute } from "./containers/hacker-news"

const mountNode = document.getElementById("main");

ReactDOM.render(
  <Relay.RootContainer
    Component={NewsStore}
    route={new NewsRoute()} />, document.getElementById("main")
)
