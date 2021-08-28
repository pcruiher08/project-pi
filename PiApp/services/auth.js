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
            return {success: true, user:{name: responseJSON.name, id: responseJSON.id}}
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

  export async function checkIsAuthenticated() {
    let token =  await AsyncStorage.getItem("@token");

    let url = `${SERVER_URL}/auth/validate/${token}`;
    let settings = {
        method: "GET",   
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            return {success: true, user: {name: responseJSON.name, id: responseJSON.id}};
        })
    
} 
