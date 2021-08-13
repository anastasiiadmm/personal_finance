import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayColor,
} from "../../material-dashboard-react";

const cardIconStyle = {
  cardIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$circleIcon": {
      borderRadius: "50%",
      backgroundColor: grayColor[0],
      marginTop: "-20px",
      marginRight: "15px",
      float: "left",
    },
  },
  circleIcon:{
    borderRadius: '50% !important'
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
};

export default cardIconStyle;
