const base_url = "https://us1.locationiq.com/v1/"

export async function getAddress(lat, long) {
    const url = base_url + `reverse.php?key=pk.0ac7e329a498517bdff116a5626d96fa&lat=${lat}&lon=${long}&format=json`;
    const settings = {
        method: "GET"
    }
    const res = await fetch(url, settings);
    if (res.ok) {
        return res.json();
    }
    throw new Error(res.statusText);
}