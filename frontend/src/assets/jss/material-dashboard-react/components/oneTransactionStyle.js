import {
  whiteColor, grayColor, hexToRgb, blackColor, successColor,
} from "../../material-dashboard-react";

const oneTransactionStyle = (theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  transactionContainer: {
    padding: "4px 0 !important",
    backgroundColor: whiteColor,
    height: 50,
    borderTop: '1px solid ' + grayColor[6],

    "&:hover,&:focus": {
      backgroundColor: grayColor[10],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.2)",
    },
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-start"
  },
  amountContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 15px !important",
  },
  grid: {
    padding: "0 15px !important",
  },
  descriptionContainer: {
    maxHeight: '40px',
    overflow: 'hidden',
    color: blackColor,
    margin: ".3125rem 1px",
    fontSize: "12px",
    fontWeight: "400",
    textAlign: "left",
    verticalAlign: "middle",
    touchAction: "manipulation",
  },

  button: {
    cursor: "pointer",
    "&:hover,&:focus": {
      color: successColor[1],
    },
  }
});

export default oneTransactionStyle;
