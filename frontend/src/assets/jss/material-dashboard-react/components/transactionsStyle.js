import {grayColor,} from "../../material-dashboard-react";

const transactionsStyle = () => ({
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
  criteriaContainer: {
    padding: '5px',
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
