import { SERVER_URL } from "../config"

export function getChartInfo(email) {
  return fetch(
    // Recibir email por medio de una variable

    `${SERVER_URL}/HID-services/job_summary.php?email=${email}`
  ).then((resp) => resp.json())
}
