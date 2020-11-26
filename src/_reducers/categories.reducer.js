import { categoryConstants } from '../_constants';

export function categories(state = {}, action) {
    switch (action.type) {
        case categoryConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case categoryConstants.GETALL_SUCCESS:
            return {
                items: action.categories
            };
        case categoryConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case categoryConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case categoryConstants.GETBYID_SUCCESS:
            return {
                currentCourse: action.course
            };
        case categoryConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };

        case categoryConstants.POST_CATEGORY_REQUEST:
            return {
                categoryCreation: true
            };
        case categoryConstants.POST_CATEGORY_SUCCESS:
            return {};
        case categoryConstants.POST_CATEGORY_FAILURE:
            return {
                error: action.error
            };

        case categoryConstants.PUT_CATEGORY_REQUEST:
            return {
                categoryUpdate: true
            };
        case categoryConstants.PUT_CATEGORY_SUCCESS:
            return {};
        case categoryConstants.PUT_CATEGORY_FAILURE:
            return {
                error: action.error
            };

        case categoryConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(category =>
                    category.id === action.id
                        ? { ...category, deleting: true }
                        : category
                )
            };
        case categoryConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(category => category.id !== category.id)
            };
        case categoryConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(category => {
                    if (category.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = category;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return category;
                })
            };
        default:
            return state
    }
}
