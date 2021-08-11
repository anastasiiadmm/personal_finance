import React from 'react';
import PropTypes from 'prop-types';

import Transactions from "../Transactions";
import Chart from "../../Chart/Chart";

import makeStyles from "@material-ui/core/styles/makeStyles";
import {AppBar, Box} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import {TabPanel} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";

import SyncAltIcon from '@material-ui/icons/SyncAlt';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Tabs from "@material-ui/core/Tabs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: "#9c27b0"
  }
}));

const TransactionsTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const a11yProps = index => {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          scrollButtons="on"
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          centered
          className={classes.tabs}
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<SyncAltIcon />} {...a11yProps(0)} />
          <Tab icon={<DonutSmallIcon />} {...a11yProps(1)} />
          <Tab icon={<AttachMoneyIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Transactions />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chart />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TransactionsTabs;