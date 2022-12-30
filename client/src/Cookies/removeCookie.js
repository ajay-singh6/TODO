import cookie from "js-cookie";


const removeCookie = (cookieName) => {
    cookie.remove(cookieName);
}

export { removeCookie };