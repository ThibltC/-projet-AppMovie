export const breadcrumbInitialState = [];

export default (state = breadcrumbInitialState, action) => {
    switch (action.type) {
        case 'ADD_CRUMB':
            const { lastPage } = action;
            return [
                ...state,
                lastPage
            ];
        case 'REMOVE_CRUMB':
            const newBreadCrumb = [...state];
            newBreadCrumb.pop();
            return newBreadCrumb;
        case 'RESET_BREADCRUMB':
            return breadcrumbInitialState;
        default:
            return state;
    }
};