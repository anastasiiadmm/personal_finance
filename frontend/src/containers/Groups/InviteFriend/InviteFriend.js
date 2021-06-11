import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {inviteFriendRequest} from "../../../store/actions/groupsActions";

const useStyles = makeStyles((theme) => ({
    button: {
        alignSelf: 'flex-end'
    }
}));

const InviteFriend = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.groups.inviteFriendLoading);
    const [email, setEmail] = useState('');

    const addFriendHandler = (event) => {
        event.preventDefault();
        dispatch(inviteFriendRequest({email: email}));
        setEmail('');
    }

    return (
        <form noValidate onSubmit={addFriendHandler}>
            <Grid container direction="column" spacing={2}>
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
                    >
                        Send invite
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default InviteFriend;