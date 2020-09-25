import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal_root: {},
    modal_container: {
        maxWidth: "fit-content",
        minWidth: "300px",
        margin: 'auto',
        backgroundColor: 'rgb(20, 20, 24)',//theme.palette.backgroundTopo.secondary,
        marginTop: "15vh",
        padding: theme.spacing(2),
    },
}));

export default useStyles;
