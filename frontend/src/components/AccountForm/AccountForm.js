import React, {useState} from 'react';
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import Grid from "@material-ui/core/Grid";
import FileInput from "../UI/Form/FileInput";

const AccountForm = ({onSubmit, loading, error, onClick}) => {
    const [state, setState] = useState({
        accountName: '',
        balance: '',
        preferences: '',
        accountIcon: ''
    });

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({
            ...prevState,
            [name]: file
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
                    label="Accounts title"
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

                <FileInput
                    name="accountIcon"
                    label="Account icon"
                    onChange={fileChangeHandler}
                    error={getFieldError('accountIcon')}
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