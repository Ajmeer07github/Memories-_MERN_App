import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  formHead:{
    background: 'linear-gradient(to left bottom, #030639, #280538, #400032, #520028, #5e051d)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textFillColor: 'transparent',
    textDecoration:'none',
    fontFamily:'cursive',
    fontSize: '2em',
    fontWeight: 1000,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    fontSize:"25px",
    width: '100%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: '10px',
  },
}));