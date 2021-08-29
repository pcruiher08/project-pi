import { SERVER_URL } from "../config"


export function getMonthSummary(email) {
	let url = `${SERVER_URL}/HID-services/month_job_count.php?email=${email}`
      
	let settings = {
	  method: "GET",
	}
      
	return fetch(url, settings)
	  .then((response) => {
	    if (response.ok) {
	      return response.json()
	    }
      
	    throw new Error()
	  })
	  .then((responseJSON) => {
	    return responseJSON
	  })
      }