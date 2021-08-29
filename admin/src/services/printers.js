import { SERVER_URL } from "../config"

export function getPrinters(email) {
  return fetch(
    // Recibir email por medio de una variable

    `${SERVER_URL}/HID-services/printers_details.php?email=${email}`
  ).then((resp) => resp.json())
}
