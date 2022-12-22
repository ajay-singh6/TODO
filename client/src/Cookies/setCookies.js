import cookie from "js-cookie";


const setCookie = (cookieName, id) => {
    cookie.set(cookieName, id, {
        expires: 1,
        secure: true,
        sameSite: 'strict',
        path: '/'
    });
}

export { setCookie };