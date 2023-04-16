const USER_TOKEN_KEY = "user_token";


export function getUserID() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(USER_TOKEN_KEY);
  }
}

export function setUserID(token) {
    console.log("token", token)
  localStorage.setItem(USER_TOKEN_KEY, token);
}