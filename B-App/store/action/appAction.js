import { AuthConst } from "../constants";
import axios from "axios";

export function signup(param) {
    console.log(params,'===========>')
    return dispatch => {
        dispatch({type: AuthConst.SIGNUP, payload: param})
    }
}

export function login() {
    
}