import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Avatar, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Person from "@material-ui/icons/Person";
import styles from "../../../assets/jss/material-dashboard-react/components/oneTransactionStyle";
import Success from "../../../components/UI/Typography/Success";
import Danger from "../../../components/UI/Typography/Danger";
import Info from "../../../components/UI/Typography/Info";
import Muted from "../../../components/UI/Typography/Muted";
import Hidden from "@material-ui/core/Hidden";


const useStyles = makeStyles(styles);

const OneTransaction = ({transaction, currency, openDetails}) => {

  const classes = useStyles();
  const date = new Date(transaction.date);
  const truncate = (source, size) => {
    return source?.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  return (
    <Grid item className={classes.transactionContainer} onClick={openDetails}>
      <Grid container alignItems="center">
        <Grid item xs={5} sm={3} md={2} className={classes.grid}>
          <Grid container>
            <Grid item xs={12} className={classes.iconContainer}>
              <Tooltip title={transaction.user?.displayName ? transaction.user.displayName : 'Deleted user'}>
                {transaction.user?.avatar ?
                  <Avatar
                    src={transaction.user.avatar}
                    className={classes.avatar}
                  />
                  :
                  <Person className={classes.icons}/>
                }
              </Tooltip>
              {transaction.type === 'Transfer' ?
                <Info><SyncAltIcon className={classes.icons}/></Info> : <>{transaction.type === 'Income' ?
                  <Success><ArrowDownwardIcon className={classes.icons}/></Success> :
                  <Danger><ArrowUpwardIcon className={classes.icons}/></Danger>}</>
              }
            </Grid>
            <Grid item xs={12}>
              <Muted> {date.toLocaleDateString()} {date.toLocaleTimeString().slice(0, -3)}</Muted>
            </Grid>
          </Grid>
        </Grid>
        <Tooltip
          title={transaction?.group?.title + ' group'}>
          <Grid item xs={3} sm={2} className={classes.grid}>
            <Grid container>
              <Grid item xs={12}>
                {transaction.type === 'Transfer' ?
                  <Success>{transaction.accountTo.accountName}</Success> : <>{transaction.type === 'Income' ?
                    <Success>{transaction.accountTo.accountName}</Success> :
                    <Danger>{transaction.accountFrom.accountName}</Danger>}</>}
              </Grid>
              <Grid item xs={12}>
                {transaction.type === 'Transfer' ?
                  <Danger>{transaction.accountFrom.accountName}</Danger> : transaction.category?.name}
              </Grid>
            </Grid>
          </Grid>
        </Tooltip>
        <Hidden xsDown implementation="js">
          <Grid item sm={4} md={5} className={classes.grid}>
            <div className={classes.descriptionContainer}>
              {truncate(transaction?.description, 45)}
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={4} sm={3} md={3} className={classes.amountContainer}>
          {transaction.type === 'Transfer' ?
            <Info>{transaction.sumOut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {currency}</Info> : <>{transaction.type === 'Income' ?
              <Success>+ {transaction.sumIn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {currency}</Success> :
              <Danger>- {transaction.sumOut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {currency}</Danger>}</>
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OneTransaction;