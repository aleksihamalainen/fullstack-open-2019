const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

let timeOutId

export const setNotification = (notification, sec) => {
    return async dispatch => {
        if (timeOutId) {
            clearTimeout(timeOutId)
        }
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        timeOutId = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: ''
            })
        }, sec * 1000)
    }
}

export default notificationReducer