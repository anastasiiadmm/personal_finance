import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
    }
  },
  palette: {
    white: {
      main: '#fff'
    }
  }
});

export default theme;