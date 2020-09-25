export const snackbarInitialState = {
    message: "",
    isSnackbarOpened: false,
}

const snackbarReducer = (state, action) => {
    switch (action.type) {
        case "CLOSE_SNACKBAR": {
            return { ...state, isSnackbarOpened: false };
        }
        case "ACTIVE_SNACKBAR": {
            const { message } = action;
            return { ...state, message, isSnackbarOpened: true };
        }
        default:
            return state;
    }
};

export default snackbarReducer;
