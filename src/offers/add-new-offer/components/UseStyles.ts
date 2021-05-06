import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '50px',
            border: 'solid 1px #237478',
        },

        textField: {
            marginTop: '20px',
            width: '100%',
            height: '50px',
            fontSize: 20,
            outline: '#237478',
            marginBottom: '70px',
            opacity: 1,
            padding: '20px'
        },

        submitButton: {
            marginTop: '24px',
            width: '120px',
            fontSize: '20px',

        },

        label: {
            fontSize: 18,
            opacity: 1,
            color: 'black',
        },

        resize: {
            fontSize: 18
        },

        resizeFile: {
            fontSize: 20,
            marginTop: '15px'

        },

        textarea: {
            width: '100%',
            marginBottom: '70px',
            padding: '20px',
            fontSize: 20,
        },

        resetButton: {
            width: 'auto',
            fontSize: '20px',
            marginTop: '24px',
            marginLeft: '20px'
        },

        editButton: {
            width: 'auto',
            fontSize: '20px',
            marginTop: '24px',
            marginLeft: '20px',
            backgroundColor: 'green'
        },

        successMessage: { color: 'green' },

        errorMessage: { color: 'red', fontSize: 18 },
    })
)

export default useStyles;