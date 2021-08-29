import { SERVER_URL } from "../config"

export function getHistory(email) {
  return fetch(
    // Recibir email por medio de una variable
    `${SERVER_URL}/HID-services/jobs_details.php?email=${email}`
  ).then((resp) => resp.json())
}
