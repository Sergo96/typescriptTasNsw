import * as createPalette from '@material-ui/core/styles/createPalette';
import {PaletteColorOptions} from "@material-ui/core";


declare module '@material-ui/core/styles/createPalette' {
    interface IconPaletteColorOptions {
        pdf?: string;
        csv?: string;
    }
    interface PaletteOptions {
        success?: PaletteColorOptions;
        warning?: PaletteColorOptions;
        regular?: PaletteColorOptions;
        icon?: IconPaletteColorOptions;

    }
}