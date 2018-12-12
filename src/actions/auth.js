// import { firebase, googleAuthProvider } from '../firebase/firebase';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { history } from "../routers/AppRouter";
import setAuthToken from "../utils/setAuthToken";

export const register = userData => dispatch => {
  /* SEND TO THE API */
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const googleLogin = token => dispatch => {
  // Restructure the token
  token = token.slice(7);
  token = token.replace(/%20/, " ");
  // Save to localStorage
  localStorage.setItem("jwtToken", token);
  // Set token to auth header
  setAuthToken(token);

  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));
  history.push("/dashboard");
};

export const login = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);

      // Decode token
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => {
  // remove token from  localStorage
  localStorage.removeItem("jwtToken");
  // remove token from auth header
  setAuthToken();
  history.push("/");
  return {
    type: "LOGOUT"
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
