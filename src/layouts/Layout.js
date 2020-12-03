import React  from 'react';
import { Link, Route } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import MemoryIcon from '@material-ui/icons/Memory';
// import TimelineIcon from '@material-ui/icons/Timeline';
import PollIcon from '@material-ui/icons/Poll';
import Container from '@material-ui/core/Container';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import DashboardPage from '../pages/DashboardPage';
import ListRecipesPage from '../pages/ListRecipesPage';
import RecipeFormPage from '../pages/RecipeFormPage';
import ListBatchesPage from '../pages/ListBatchesPage';
import BatchFormPage from '../pages/BatchFormPage';
// import ListControlProfilesPage from '../pages/ListControlProfilesPage';
import '../App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: 825,
    },
  }));
  

export default function Layout() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return(
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                [classes.hide]: open,
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Controle e Monitoramento da Fermentação
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
            }}
        >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                {key:'dashboard', name: 'Dashboard', icon: ViewQuiltIcon, link: '/',}, 
                {key:'dispositivos', name: 'Dispositivos', icon: MemoryIcon, link: '/dispositivos',}, 
                {key:'receitas', name: 'Receitas', icon: AssignmentIcon, link: '/receitas',}, 
                // {key:'controle', name: 'Perfis de Controle', icon: TimelineIcon, link: '/controle',}, 
                {key:'associar', name: 'Iniciar Lote', icon: AddToHomeScreenIcon, link: '/associar',}, 
                {key:'analises', name: 'Análises', icon: PollIcon, link: '/analises',},
              ].map(item => (
              <Tooltip key={item.key} title={item.name} placement='right'>
                  <ListItem button key={item.key} component={Link} to={item.link}>
                    <ListItemIcon>
                        {<item.icon />}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
              </Tooltip>
              ))}
            </List>           
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
              <Paper className={classes.paper} >
                <Route exact path='/' component={DashboardPage} />
                <Route exact path='/receitas' component={ListRecipesPage} />
                <Route exact path='/receitas/:recipe_id' component={RecipeFormPage} />
                <Route exact path='/receitas/:recipe_id/lotes' component={ListBatchesPage} />
                <Route exact path='/receitas/:recipe_id/lotes/:batch_id' component={BatchFormPage} />
                {/* <Route exact path='/controle' component={ListControlProfilesPage} /> */}
              </Paper>
        </Container>
        </main>
      </div>
    )
}
