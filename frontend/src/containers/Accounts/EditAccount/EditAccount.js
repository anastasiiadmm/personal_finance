import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../../components/UI/Form/FormElement";
import FileInput from "../../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {fetchAccountsRequest, updateAccountRequest} from "../../../store/actions/accountsActions";

const EditAccount = (id) => {
    const account = useSelector(state => state.accounts.account);
    const loading = useSelector(state => state.accounts.accountsLoading);
    const error = useSelector(state => state.accounts.updateAccountError);
    const params = useParams();
    const dispatch = useDispatch();
    console.log(account)
    const [state, setState] = useState({});

    console.log(state);



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

    const submitFormHandler = e => {
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

        accountData.id = id.id

        if (Object.keys(accountData).length !== 0 && accountData.constructor === Object) {
            dispatch(updateAccountRequest(accountData));
        }
        console.log(accountData);
        console.log(id.id);

        // dispatch(fetchAccountsRequest(params.id));
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
                    >
                        Edit
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default EditAccount;