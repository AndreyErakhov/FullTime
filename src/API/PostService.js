import axios from "axios";
import GetCookie from "../Modules/cookieConroller/getCokie";
import SetCookie from "../Modules/cookieConroller/setCookie";
import RemoveCookie from "../Modules/cookieConroller/removeCookie";

async function globalService(num,reqest) {

    if(num === 'BoardListRefresh'){
        return await BoardListRefresh()
    }else if (num === 'deleteBoard'){
        return await deleteBoard(reqest)
    }else if(num === 'createBoard'){
        return await createBoard(reqest)
    } else if(num === 'signIn'){
        return await signIn(reqest)
    } else if(num === 'createUser'){
        return await createUser(reqest)
    }else if(num === 'verifyUser'){
        return await verifyUser(reqest)
    }else if(num === 'GetProfile'){
        return await getProfile()
    }else if(num === 'forgottenPasswordRequest'){
        return await forgottenPasswordRequest(reqest)
    }else if(num === 'changePasswordRequest'){
        return await changePasswordRequest(reqest)
    }else if(num === 'GetColumns'){
        return await GetColumns(reqest)
    }else if(num === 'updateColumns'){
        return await updateColumns(reqest)
    }
}

async function GetColumns(boardId) {
    try {
    let token = GetCookie('token')
    const boardRefresh = await axios.get(`http://194.85.169.95:9224/boards/${boardId.BoardID}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((resp) => resp.data )  
        return boardRefresh
    } catch(error) {
        return await APIErrorHandler(error, "GetColumns");
    }

}

async function updateColumns(formData) {
    try {
        let token = GetCookie('token')
        const createAxios = await axios.post('http://194.85.169.95:9224/boards/columns', formData, {
            headers: {
                Authorization: 'Bearer ' + token
                }
        }).then((resp) => ['complete', resp.data] )
        return createAxios
    } catch(error) {
        // return await APIErrorHandler(error,"updateColumns", formData);
    }
}

    async function getProfile() {
        try {
        let token = GetCookie('token')
        const boardRefresh = await axios.get('http://194.85.169.95:9224/users/profile', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then((resp) => ['complete', resp.data])    
            return boardRefresh
        } catch (error) {
            return await APIErrorHandler(error, "getProfile");
        }
    }

    async function BoardListRefresh() {
        try {
        let token = GetCookie('token')
        const boardRefresh = await axios.get('http://194.85.169.95:9224/users/boards-list', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((resp) => resp.data )   
            return boardRefresh
        } catch(error) {
            return await APIErrorHandler(error, "BoardListRefresh");
        }
    }

    async function deleteBoard(post) {
        try {
            let token = GetCookie('token')
            const deleteUrl = 'http://194.85.169.95:9224/boards/' + post.boardId
            const boardRefresh12 = await axios.delete(deleteUrl, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(() => ['complete','Доска удалена'])
                return boardRefresh12
        } catch(error) {
            return await APIErrorHandler(error,"deleteBoard", post);
        }
    }


    async function createBoard(formData) {
        try {
            let token = GetCookie('token')
            const createAxios = await axios.post('http://194.85.169.95:9224/boards', formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                    }
            }).then((resp) => ['complete', resp.data] )
            return createAxios
        } catch(error) {
            return await APIErrorHandler(error,"createBoard", formData);
        }
    }
       
//Авторизация
async function signIn(userData){
    try {
        let token = GetCookie('token')
        const signInAxios = await axios.post('http://194.85.169.95:9224/users/auth', userData,{
            headers: {
                Authorization: 'Bearer' + token
            }
        }).then((resp) => ['complete', resp.data])
        return signInAxios
    } catch(error){
        return await APIErrorHandler(error,"signIn",userData);
    }
} 

// Регистрация
async function createUser(registrationData){
    try {
        let token = GetCookie('token')
        const createNewUserAxios = await axios.post('http://194.85.169.95:9224/users', registrationData,{
            headers: {
                Authorization: 'Bearer' + token
            }
        }).then((resp) => ['complete', resp.data.message])
        return createNewUserAxios
    } catch(error){
        return await APIErrorHandler(error,"createUser",registrationData);
    }
}

// verifyUserRegistration
async function verifyUser(verifyData){
    try {
        let token = GetCookie('token')
        const verifyUserAxios = await axios.post('http://194.85.169.95:9224/verifications/register', verifyData,{
            headers: {
                Authorization: 'Bearer' + token
            }
        }).then((resp) => ['complete', resp.data])
        return verifyUserAxios
    } catch(error){
        return await APIErrorHandler(error,"verifyUser",verifyData);
    }
}

//forgottenPasswordRequest
async function forgottenPasswordRequest(emailData){
    try {
        let token = GetCookie('token')
        const forgottenPasswordRequestAxios = await axios.patch('http://194.85.169.95:9224/users/password-reset', emailData,{
            headers: {
                Authorization: 'Bearer' + token
            }
        }).then((resp) => ['complete', resp.data])
        return forgottenPasswordRequestAxios
    } catch(error){
        if(error.message){
            return error.message
        } else if(error.request){
            return error.request
        }
    }
}

//changePassword
async function changePasswordRequest(newPasswordData){
    try {
        let token = GetCookie('token')
        const changePasswordRequestAxios = await axios.patch('http://194.85.169.95:9224/verifications/reset-password', newPasswordData,{
            headers: {
                Authorization: 'Bearer' + token
            }
        }).then((resp) => ['complete', resp.data])
        return changePasswordRequestAxios
    } catch(error){
        if(error.message){
            return error.message
        } else if(error.request){
            return error.request
        }
    }
}

//API Reqests END

//Генератор нового токена
async function reLoadToken() {
    let refreshToken = GetCookie('refreshToken')
    if(!refreshToken){
        window.location.href = '/'
    }
    await axios.patch('http://194.85.169.95:9224/users/auth', {
        refreshToken: refreshToken,
    })
    .then((resp) => {
        let token = ''
        const tokenError = resp.data;
        token = tokenError.token
        async function updateCookie() {
           await SetCookie('token', token)
           await SetCookie('refreshToken', tokenError.refreshToken)
        }
        updateCookie()
    }).catch(err => {
        const errAsync = async (err) => {
                await APIErrorHandler(err);
                
        }
        return errAsync(err);
      });


    return 1

}



async function APIErrorHandler(err,funcName,reqestData) {
    if (err.response.data.message){
        if(err.message === 'Request failed with status code 303' || err.message === 'Request failed with status code 400'){
            const errToken = async () => {
                await reLoadToken();
                return await globalService(funcName,reqestData);
            }
            return errToken();
        } else if(err.message === 'Request failed with status code 403' || err.message === 'Request failed with status code 401'){    
            const delCookie = async () => {
                if (GetCookie("token") || GetCookie("refreshToken")){
                    await RemoveCookie("token");
                    await RemoveCookie("refreshToken");
                }
                window.location.href = '/';
            }
            return await delCookie();
        }
        return ['error', err.response.data.message];
    }else if(err.message){
        return ['error', err.message];
    }else {
        return ['error', "Произошла неизвестная ошибка. Пожалуйста попробуйте позже или обратитесь в поддержку своей организации."];
    }
    
}
export default globalService