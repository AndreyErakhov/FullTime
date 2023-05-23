import Cookie from 'js-cookie'

const SetCookie = (cookiename, cookieInfo) => {
    Cookie.set(cookiename, cookieInfo, {
        expires: 14,
        secure: false,
        sameSite: 'strict',
        path:"",
    });
};

export default SetCookie;