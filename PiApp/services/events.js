import {SERVER_URL} from '../config';

export async function getEvents(latitude, longitude) {
    let url = `${SERVER_URL}/events/fetch?lat=${latitude}&lon=${longitude}&r=0.005&seconds=30`
    const settings = {
        method: "GET"
    }
    const res = await fetch(url, settings);
    if (res.ok) {
        return res.json();
    }
    throw new Error(res.statusText);
}