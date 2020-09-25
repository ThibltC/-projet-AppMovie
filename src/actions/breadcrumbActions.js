export const addLastPageToBreadcrumb = (lastPage) => (dispatch) => {
    dispatch({
        type: 'ADD_CRUMB',
        lastPage
    });
};

export const removelastPageFromBreadcrumb = () => (dispatch) => {
    dispatch({
        type: 'REMOVE_CRUMB'
    });
};

export const resetBreadcrumb = () => (dispatch) => {
    dispatch({
        type: 'RESET_BREADCRUMB'
    });
};