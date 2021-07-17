import {
  dangerColor,
  grayColor, whiteColor,
} from "../../material-dashboard-react";
import dashboardStyle from "./dashboardStyle";


const newTransactionStyle = (theme) => ({
  ...dashboardStyle,
  treeCategory: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  close: {
    zIndex: theme.zIndex.drawer + 4,
    position: "absolute",
    top: '-11px',
    right: '-10px',
    color: dangerColor,

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: whiteColor,
  },
  animation: {
    height: '95%'
  }
});

export default newTransactionStyle;
