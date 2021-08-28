import {SERVER_URL} from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";


export async function login(email, password) {
    console.log(email);
    console.log(password);
    let url = `${SERVER_URL}/auth/login`
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            storeToken(responseJSON.token);
            return {success: true, user: responseJSON}
        })
}


const storeToken = async (token) => {
    try {
      const jsonValue = token;
      await AsyncStorage.setItem("@token", jsonValue);
    } catch (e) {
      console.log("Async Storage Error");
      throw e;
    }
  };