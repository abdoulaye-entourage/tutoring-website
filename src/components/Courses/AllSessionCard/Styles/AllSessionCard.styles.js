import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => {
  return {
    boxContent: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '500px',
      padding: '1.5rem',
      borderRadius: '5px',
      boxShadow: '1px 1px 3px #FFA500',
      flexWrap: 'wrap',
      backgroundColor: '#ffe19c',
      [theme.breakpoints.down('md')]: {
        width: '48%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: '48%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '32%',
      },
    },
    boxContentChild: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '77%',
      pl: 1,
      pb: 1,
    },
    paper: {
      position: 'absolute',
      top: '60px',
      bottom: '160px',
      left: '0',
      width: '45%',
      backgroundColor: '#ffe19c',
      padding: '10px',
    },
    paperChildOne: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      width: '100%',
    },
    paperChilTwo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '1.5rem',
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      margin: '1rem',
    },

    confirmationMessage: {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(1.5),
      textAlign: 'center',
      backgroundColor: '#4caf50',
      color: 'white',
      borderRadius: theme.spacing(1),
      fontSize: theme.spacing(3),
      width: '60%',
      position: 'absolute',
      top: 0,
      right: 0,
    },
  };
});
