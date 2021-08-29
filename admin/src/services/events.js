import { SERVER_URL } from "../config"

export function getEvents() {
  return fetch(
    `${SERVER_URL}/events/all`
  ).then((resp) => resp.json())
}