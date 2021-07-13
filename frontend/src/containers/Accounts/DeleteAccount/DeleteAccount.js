import React, {useState} from 'react';
import FormElement from "../../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {deleteAccountRequest} from "../../../store/actions/accountsActions";

const DeleteAccount = ({id}) => {
    const dispatch = useDispatch();
    const deleteAccount = useSelector(state => state.accounts.accounts);
    const error = useSelector(state => state.accounts.deleteAccountError);
    const loading = useSelector(state => state.accounts.deleteAccountLoading);
    const [state, setState] = useState({
        accountName: ''
    });
    console.log(state);
    const idToDelete = id;


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
    let disable = true;
    if (state.accountName !== deleteAccount.accountName) {
        disable = true;
    } else if (state.accountName === deleteAccount.accountName) {
        disable = false;
    }
    function checkParams() {

    }
    // const checkAccountName = () => {
    //
    // }

    console.log(disable);
    const onDeleteFormSubmit = (e) => {
        e.preventDefault();


        for (let i = 0; i < deleteAccount.length; i++) {
            if (state.accountName === deleteAccount[i].accountName) {
                dispatch(deleteAccountRequest(idToDelete));
            }
        }

    }


    return (
        <Grid container direction="column" spacing={2}>
            <form onSubmit={onDeleteFormSubmit}>
                <b>Введите название счета для удаления</b>
                <FormElement
                    required
                    label="Account title"
                    name="accountName"
                    value={state.accountName}
                    onChange={inputChangeHandler}
                    error={getFieldError('accountName')}
                />
                <ButtonWithProgress
                    type="submit"
                    color="primary"
                    variant="contained"
                    loading={loading}
                    disabled={loading}
                >
                    Delete
                </ButtonWithProgress>
            </form>
        </Grid>
    );
};

export default DeleteAccount;