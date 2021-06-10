import React, {useState} from 'react';
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import Grid from "@material-ui/core/Grid";

const AccountForm = ({onSubmit, loading, error}) => {
    const [state, setState] = useState({
        accountName: '',
        balance: '',
        preferences: '',
        userId: '',
        groupId: ''
    });

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <form onSubmit={(e) => onSubmit(e, state)} noValidate>
            <Grid container direction="column" spacing={2}>
                <FormElement
                    required
                    label="AccountName"
                    name="accountName"
                    value={state.accountName}
                    onChange={inputChangeHandler}
                    error={getFieldError('accountName')}
                />

                <FormElement
                    required
                    label="Balance"
                    name="balance"
                    value={state.balance}
                    onChange={inputChangeHandler}
                    error={getFieldError('balance')}
                />

                <FormElement
                    label="Preferences"
                    name="preferences"
                    value={state.preferences}
                    onChange={inputChangeHandler}
                    error={getFieldError('preferences')}
                />
                <FormElement
                    required
                    label="User"
                    name="userId"
                    value={state.userId}
                    onChange={inputChangeHandler}
                    error={getFieldError('userId')}
                />
                <FormElement
                    required
                    label="Group"
                    name="groupId"
                    value={state.groupId}
                    onChange={inputChangeHandler}
                    error={getFieldError('groupId')}
                />

                <Grid item xs>
                    <ButtonWithProgress
                        type="submit"
                        color="primary"
                        variant="contained"
                        loading={loading}
                        disabled={loading}
                    >
                        Create
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default AccountForm;