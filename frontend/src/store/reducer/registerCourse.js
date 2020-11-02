import {
    SET_REGIESTER_COURSE,
    CLEAR_REGISETR_COURSE
} from './actionType'

let newState = {}

const registerCourse = (state = {}, action) => {

    switch (action.type) {
        case SET_REGIESTER_COURSE:
            newState = {
                ...action.data
            }
            return newState
        case CLEAR_REGISETR_COURSE:
            newState = {}
            return newState
        default:
            return state
    }
}

export default registerCourse