import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../../components/UI/Form/FormElement";
import FileInput from "../../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {updateAccountRequest} from "../../../store/actions/accountsActions";
import {useParams} from "react-router-dom";

const EditAccount = ({id, onClose}) => {
    const account = useSelector(state => state.accounts.account);
    const loading = useSelector(state => state.accounts.updateAccountLoading);
    const error = useSelector(state => state.accounts.updateAccountError);
    const params = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({});


    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const submitFormHandler = (e, data) => {
        e.preventDefault();
        const accountData = {
            accountName: account.accountName,
            accountIcon: account.accountIcon
        };

        if (state.accountName !== account.accountName) {
            accountData.accountName = state.accountName
        }
        if (state.accountIcon !== account.accountIcon) {
            accountData.accountIcon = state.accountIcon
        }

        accountData.id = id

        if (Object.keys(accountData).length !== 0 && accountData.constructor === Object) {
            dispatch(updateAccountRequest({id: params.id , accountData}));
        }

    };


    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <form onSubmit={submitFormHandler} noValidate>
            <Grid container direction="column" spacing={2}>
                <FormElement
                    required
                    label="Accounts title"
                    name="accountName"
                    value={state.accountName}
                    onChange={inputChangeHandler}
                    error={getFieldError('accountName')}
                />

                <FileInput
                    name="accountIcon"
                    label="Icon"
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
                        Edit
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default EditAccount;