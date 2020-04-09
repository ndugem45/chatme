const initialState = {
    myProfile: {},
    userData: [],
    chatData: [],
    optChat: -1,
};

const reducer = (prevState = initialState, action) => {
    var r = {
        ...prevState
    }
    switch (action.type) {
        case 'OptChat':
            r.optChat = action.value;
            return r;
            break;
        case 'MyProfile':
            r.myProfile = action.value;
            return r;
            break;
        case 'UserData':
            r.userData = action.value;
            return r;
            break;
        case 'ChatData':
            r.chatData = action.value;
            return r;
            break;
        default:
            return prevState;
            break;
    }
}

export default reducer;