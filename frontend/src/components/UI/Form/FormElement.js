import React from 'react';
import PropTypes from 'prop-types';
import {Grid, MenuItem, TextField} from "@material-ui/core";


const FormElement = ({error, select, options, hide, ...props}) => {
  let inputChildren = null;

  if (select) {
    inputChildren = options.map(option => (
      <MenuItem key={option.id} value={option.id}>
        {option.title}
      </MenuItem>
    ));
  }
  let show = true;
  if (hide) {
    show = !hide;
  }

  return (
    <>
      {
        show ?
          <Grid item xs>
            <TextField
              select={select}
              error={Boolean(error)}
              helperText={error}
              {...props}
            >
              {inputChildren}
            </TextField>
          </Grid> : null
      }
    </>
  );
};

FormElement.propTypes = {
  ...TextField.propTypes,
  error: PropTypes.string,
  select: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default FormElement;