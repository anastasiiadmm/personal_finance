import {grayColor,} from "../../material-dashboard-react";
import dashboardStyle from "../views/dashboardStyle";

const transactionsStyle = () => ({
  ...dashboardStyle,
  table: {
    minWidth: 650,
  },
  transactionsContainer: {
    position: 'relative',
    "&:last-child": {
      paddingBottom: 2,
      borderBottom: '1px solid ' + grayColor[6],
    },
  },
  navigationContainer: {
    paddingTop: 0,
    justifyContent: "flex-end",
  },
  progressCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-10px',
    marginLeft: '-10px',
  },

  checkImage: {
    width: "100%",
    transform: "none",
    height: "100%",
  },

});

export default transactionsStyle;
