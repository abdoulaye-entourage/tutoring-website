import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => {
  return {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
      margin: 'auto',
      width: '50%',
      padding: '2rem',
      borderRadius: '10px',
      backgroundColor: theme.palette,
      boxShadow: theme.shadows[5],
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    button: {
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#FF8C00',
      },
    },
  };
});
