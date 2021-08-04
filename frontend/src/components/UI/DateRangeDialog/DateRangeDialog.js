import React from 'react';
import {DateRange} from "react-date-range";
import DialogContainer from "../DialogContainer/DialogContainer";


const DateRangeDialog = ({handleClose, open, setCriteria, ranges}) => {
  return (
    <>
      <DialogContainer open={open} handleClose={handleClose} style={
        {
          minWidth: '335px',
          maxWidth: '335px',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}>
        <DateRange
          showDateDisplay={false}
          fixedHeight={true}
          onChange={item => setCriteria(item.selection)}
          moveRangeOnFirstSelection={true}
          ranges={ranges}
        />
      </DialogContainer>
    </>
  );
};

export default DateRangeDialog;