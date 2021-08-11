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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          centered
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Transactions" icon={<SyncAltIcon />} {...a11yProps(0)} />
          <Tab label="Chart" icon={<DonutSmallIcon />} {...a11yProps(1)} />
          <Tab label="Summary" icon={<AttachMoneyIcon />} {...a11yProps(2)} />
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