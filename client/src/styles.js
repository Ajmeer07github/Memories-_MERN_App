import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0,183,255, 1)',
  },
  memories_logo: {
    marginLeft: '15px',
  },
  //  breakpointsin materialui are same as media queries in css
  [theme.breakpoints.down('sm')]: {
    main_container: {
        Direction:"column-reverse",
      },
  }
  
}));