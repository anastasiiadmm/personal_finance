import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../../../components/UI/Form/FormElement";
import FileInput from "../../../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../../../components/UI/ButtonWithProgress/ButtonWithProgress";

const GroupForm = ({onSubmit, loading, error, onClose}) => {
    const [group, setGroup] = useState({
        nameGroup: '',
        avatarGroup: ''
    });

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(group).forEach(key => {
            formData.append(key, group[key]);
        });

        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;

        setGroup(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setGroup(prevState => ({
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
        <form onSubmit={submitFormHandler} noValidate>
            <Grid container direction="column" spacing={2}>
                <FormElement
                    required
                    label="Name"
                    name="nameGroup"
                    value={group.nameGroup}
                    onChange={inputChangeHandler}
                    error={getFieldError('nameGroup')}
                />

                <Grid item xs>
                    <FileInput
                        name="avatarGroup"
                        label="Image"
                        onChange={fileChangeHandler}
                        error={getFieldError('avatarGroup')}
                    />
                </Grid>

                <Grid item xs>
                    <ButtonWithProgress
                        type="submit" color="primary" variant="contained"
                        loading={loading} disabled={loading}
                        onClick={onClose}
                    >
                        Create
                    </ButtonWithProgress>
                </Grid>

            </Grid>
        </form>
    );
};

export default GroupForm;