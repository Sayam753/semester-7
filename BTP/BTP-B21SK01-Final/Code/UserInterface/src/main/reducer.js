import jwt_decode from "jwt-decode";

var mystate = {isLoggedin : false}
const storedJwt = localStorage.getItem('user_token');
if (storedJwt) {
    const obj = jwt_decode(storedJwt);
    obj["isLoggedin"] = true;
    obj["token"] = storedJwt;
    mystate = obj;
}

export const userinitialState = mystate


const userreducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.item;

        case 'LOGOUT':
            const storedJwt = localStorage.getItem('user_token');
            if (storedJwt) {
                localStorage.removeItem('user_token');
            }

            return { isLoggedin: false }
        default:
            return state;

    }
}


export default userreducer