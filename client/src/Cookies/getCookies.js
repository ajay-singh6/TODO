import cookie from "js-cookie";


const getCookie = (cookieName) => {
    cookie.get(cookieName);
}

export { getCookie };