import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {inviteFriendRequest} from "../../../../store/actions/groupsActions";
import {useParams} from "react-router-dom";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        alignSelf: 'flex-end'
    }
}));

const InviteFriendForm = ({onClose}) => {
    const params = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.groups.inviteFriendLoading);
    const [email, setEmail] = useState('');
    const groupId = params.id;

    const addFriendHandler = (event) => {
        event.preventDefault();
        dispatch(inviteFriendRequest({groupId, email}));
        setEmail('');
    }

    return (
        <form noValidate onSubmit={addFriendHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography variant="h4">Add user</Typography>
                </Grid>

                <FormElement
                    required
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Grid item xs className={classes.button}>
                    <ButtonWithProgress
                        type="submit"
                        color="primary"
                        variant="contained"
                        loading={loading}
                        disabled={loading}
                        onClick={onClose}
                    >
                        Send invite
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default InviteFriendForm;