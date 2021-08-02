import React from 'react';
import {Dialog} from "@material-ui/core";
import {DateRange} from "react-date-range";

const DateRangeDialog = ({handleClose, open, setCriteria, ranges}) => {
  return (
    <>
      <Dialog
        disableScrollLock
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            minWidth: '335px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxWidth: '335px',
          },
        }} open={open} onClose={handleClose}>
        <DateRange
          showDateDisplay={false}
          fixedHeight={true}
          onChange={item => setCriteria(item.selection)}
          moveRangeOnFirstSelection={true}
          ranges={ranges}
        />
      </Dialog>
    </>
  );
};

export default DateRangeDialog;