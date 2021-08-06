import {createTheme} from "@material-ui/core";
import {green, pink, red, blue} from "@material-ui/core/colors";
// import {Simulate} from "react-dom/test-utils";

export default createTheme({
    palette: {
        primary: {
            main: '#8c8c8d',
            light: '#e1e1e3',
        },
        success: {
            main: green[500],
            light: green[100],
        },
        warning: {
            main: red[500],
            light: red[100],
        },
        regular: {
            main: blue[500],
            light: blue[100],
        },
        icon: {
            pdf: pink[400],
            csv: pink[100],
        }
    }
})