import {blackColor, grayColor, hexToRgb} from "../../material-dashboard-react";

const cardAvatarStyle = {
  cardAvatar: {
    "&$cardAvatarProfile img": {
      width: "100%",
      height: "auto",
    },
    "&$cardAvatarPlain img": {
      width: "100%",
      height: "auto",
      display: 'block'
    },
    "&$cardAvatarCheck svg": {
      width: "100%",
      height: "auto",
    },
    "&$cardAvatarIcon svg": {
      width: "100%",
      height: "auto",
    },
    "&$cardAvatarCheck img": {
      width: '100%',
      maxHeight: 'auto',
      display: 'block',
    },
  },
  cardAvatarProfile: {
    maxWidth: "120px",
    maxHeight: "130px",
    margin: "-50px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 16px 38px -12px rgba(" +
      hexToRgb(blackColor) +
      ", 0.56), 0 4px 25px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    "&$cardAvatarPlain": {
      marginTop: "0",
    },
  },
  cardAvatarPlain: {
    overflow: "hidden",
    maxWidth: "250px",
    maxHeight: "250px",
    borderRadius: "4%",
  },
  cardAvatarCheck: {
    overflow: "hidden",
    maxWidth: "100px",
    maxHeight: "100px",
    borderRadius: "4%",
    "&:hover,&:focus": {
      backgroundColor: grayColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.2)",
    }
  },
  cardAvatarIcon: {
    overflow: "hidden",
    maxWidth: "100px",
    maxHeight: "100px",
    borderRadius: "4%",
  },
};

export default cardAvatarStyle;
