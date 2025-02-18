import { makeStyles } from '@material-ui/core/styles';

export const useAuthStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: theme.spacing(4),
  },
  formWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  quoteContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2),
  },
  quote: {
    color: theme.palette.text.primary,
    fontSize: '1.2rem',
    fontStyle: 'italic',
    marginBottom: theme.spacing(1),
  },
  author: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
  root: {
    minHeight: '100vh',
    opacity: 0,
    animation: '$fadeIn 0.4s ease-out forwards',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: '$slideUp 0.4s ease-out forwards',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    animation: '$scaleIn 0.3s ease-out',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  formField: {
    opacity: 0,
    animation: '$slideUp 0.4s ease-out forwards',
    '&:nth-child(1)': {
      animationDelay: '0.1s',
    },
    '&:nth-child(2)': {
      animationDelay: '0.2s',
    },
    '&:nth-child(3)': {
      animationDelay: '0.3s',
    },
  },
  errorAlert: {
    animation: '$shake 0.4s ease-in-out',
    marginBottom: theme.spacing(2),
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes scaleIn': {
    from: {
      transform: 'scale(0.8)',
      opacity: 0,
    },
    to: {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  '@keyframes shake': {
    '0%, 100%': {
      transform: 'translateX(0)',
    },
    '25%': {
      transform: 'translateX(-5px)',
    },
    '75%': {
      transform: 'translateX(5px)',
    },
  },
}));