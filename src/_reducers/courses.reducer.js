import { courseConstants } from '../_constants';

export function courses(state = {}, action) {
    switch (action.type) {
        case courseConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };
        case courseConstants.GET_ALL_SUCCESS:
            return {
                items: action.courses
            };
        case courseConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        case courseConstants.GET_BY_ID_REQUEST:
            return {
                loading: true
            };
        case courseConstants.GET_BY_ID_SUCCESS:
            return {
                currentCourse: action.course
            };
        case courseConstants.GET_BY_ID_FAILURE:
            return {
                error: action.error
            };

        case courseConstants.POST_COURSE_REQUEST:
            return {
                courseCreation: true
            };
        case courseConstants.POST_COURSE_SUCCESS:
            return {};
        case courseConstants.POST_COURSE_FAILURE:
            return {
                error: action.error
            };

        case courseConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case courseConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case courseConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}
