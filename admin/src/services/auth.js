import { SERVER_URL } from "../config"

export function CheckIsAuthenticated() {
  let token = localStorage.getItem("token")
  var authenticated = false

  // Mandar en el body el token
  let url = `${SERVER_URL}/auth/validate/${token}`
  let settings = {
    // method: "GET",
    method: "GET",
  }

  // useEffect(() => {
  //   fetch("https://60af14a65b8c300017deba6a.mockapi.io/api/pendientes")
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       setData(resp)
  //     })
  // }, [])
  console.log("Checando Token")
  return fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error()
    })
    .then((responseJSON) => {
      return { success: true, user: responseJSON }
      // return { success: true, user: { ...responseJSON.user } }
    })
}

export function authSignUp(credentials) {
  let url = `${SERVER_URL}/api/users/create`
  let settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
    }),
  }

  return fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(response.statusText)
    })
    .then((responseJSON) => {
      return { success: true }
    })
}

export function authLogin(credentials) {
  //////////////////////////////////////////////////

  // console.log(credentials)

  let url = `${SERVER_URL}/auth/login`
  // let url = `${SERVER_URL}/api/login`
  let settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/json",
      // Accept: "application/json",
      // Authorization: "token",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  }

  return fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(response.statusText)
    })

    .then((responseJSON) => {
      localStorage.setItem("token", responseJSON.token)
      return {
        success: true,
        user: {name: responseJSON.name, id: responseJSON},
      }
    })
}

export function authLogout() {
  localStorage.removeItem("token")
  return new Promise((resolve, reject) => resolve(true))
}
