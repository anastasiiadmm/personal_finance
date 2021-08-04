import React, {useState} from 'react';
import FormElement from "../../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import Grid from "@material-ui/core/Grid";
import FileInput from "../../../components/UI/Form/FileInput";
import {useSelector} from "react-redux";
import {currencies} from "../../../utils";

const AccountForm = ({onSubmit, loading, error, onClose}) => {

    const accountCurrencies = useSelector(state => state.accounts.accounts);

    const [state, setState] = useState({
        accountName: '',
        balance: 0,
        currency: accountCurrencies.currency,
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
                    label="Account title"
                    name="accountName"
                    value={state.accountName}
                    onChange={inputChangeHandler}
                    error={getFieldError('accountName')}
                />

                {/*<FormElement*/}
                {/*    required*/}
                {/*    label="Balance"*/}
                {/*    name="balance"*/}
                {/*    value={state.balance}*/}
                {/*    onChange={inputChangeHandler}*/}
                {/*    error={getFieldError('balance')}*/}
                {/*/>*/}

                <FormElement
                    required
                    label="Currency"
                    name="currency"
                    value={state.currency}
                    select
                    options={currencies}
                    onChange={inputChangeHandler}
                    error={getFieldError('Currency')}
                />

                <FileInput
                    name="accountIcon"
                    label="Image"
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
                        onClick={onClose}
                    >
                        Create
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default AccountForm;