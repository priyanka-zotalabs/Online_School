import{
    SET_FORM_REQUEST
} from './actionType'

let newState=[]

const formRequest = (state=[], action)=>{

    switch (action.type) {
        case SET_FORM_REQUEST:
            newState = [
                ...action.data
            ]
            return newState
        default:
                return state
    }
}

export default formRequest