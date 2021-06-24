import React, {useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  input: {
    display: 'none'
  },
  button: {
    width: '100%',
    padding: '5px 0',
  }
});

const FileInput = ({onChange, name, label, avatar, children}) => {
    const classes = useStyles();
    const inputRef = useRef();

    const [filename, setFilename] = useState('');

    const activateInput = () => {
      inputRef.current.click();
    };

    const onFileChange = e => {
      if (e.target.files[0]) {
        setFilename(e.target.files[0].name);
      } else {
        setFilename('');
      }
      onChange(e);
    };
    return (
      <>
        <input
          type="file"
          name={name}
          value={avatar}
          className={classes.input}
          onChange={onFileChange}
          ref={inputRef}
        />
        <Grid container spacing={2} alignItems={"center"}>
          {children ? <Grid xs={6} sm={12} item onClick={activateInput}>{children}</Grid> : null}
          <Hidden only="xs">
            <Grid item md={6} sm={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                label={label}
                value={filename}
                onClick={activateInput}
              />
            </Grid>
          </Hidden>
          <Grid item md={6} sm={12} xs={6}>
            <Button className={classes.button}
                    variant="contained"
                    onClick={activateInput}
            >
              Browse
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
;

export default FileInput;