import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import ConfirmDialog from '../components/ConfirmDialog';
import moment from "moment";

import * as RecipeService from '../services/RecipeService'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  makeStyles();


class ListRecipePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            openDeleteDialog: false,
            selected: {name: "", recipe_id: 0},
            page: 0,
            total: 0,
        };
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            data: this.state.data,
            openDeleteDialog: this.state.openDeleteDialog,
            selected: this.state.selected,
            page: newPage,
            total: this.state.total,
        });
      };

    setOpenDeleteDialog = (value) => {
        this.setState({
            data: this.state.data,
            openDeleteDialog: value,
            selected: this.state.selected,
            page: this.state.page,
            total: this.state.total,
        });
    }

    confirmDelete = (value) => {
        this.setState({
            data: this.state.data,
            openDeleteDialog: true,
            selected: value,
            page: this.state.page,
            total: this.state.total,
        });
    }

    componentDidMount = () => {
        RecipeService.getRecipes(this.state.page, 10).then((data) => {
            this.setState({
                data: data.content,
                openDeleteDialog: this.state.openDeleteDialog,
                selected: this.state.selected,
                page: this.state.page,
                total: data.totalElements,
            });
        });
    }

    deleteSelectedRecipe = () => {
        RecipeService.deleteRecipe(this.state.selected.recipe_id).then(() => {
            RecipeService.getRecipes(this.state.page, 10).then((data) => {
                this.setState({
                    data: data.content,
                    openDeleteDialog: this.state.openDeleteDialog,
                    selected: {name: "", recipe_id: 0},
                    page: this.state.page,
                    total: this.state.total,
                });
            });
        })
    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={0}>
                    <Grid item xs={6}><Breadcrumbs aria-label="breadcrumb"><Link color="inherit" href="/receitas">Receitas</Link></Breadcrumbs></Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={1}><Button variant="contained" color="secondary" href={'/receitas/0'}>Adicionar</Button></Grid>
                </Grid>
                <Box p={1} />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Nome da Receita</b></StyledTableCell>
                            <StyledTableCell><b>Estilo</b></StyledTableCell>
                            <StyledTableCell><b>Cadastrada Por</b></StyledTableCell>
                            <StyledTableCell><b>Cadastrada Em</b></StyledTableCell>
                            <StyledTableCell><b>Ações</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((recipe) => (
                            <StyledTableRow key={recipe.recipe_id}>
                                <StyledTableCell>{recipe.name}</StyledTableCell>
                                <StyledTableCell>{recipe.style}</StyledTableCell>
                                <StyledTableCell>{recipe.created_by}</StyledTableCell>
                                <StyledTableCell>{moment(recipe.created_at).format("DD/MM/YYYY HH:mm")}</StyledTableCell>
                                <StyledTableCell>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <IconButton color='secondary' href={`/receitas/${recipe.recipe_id}/lotes`}>
                                                <Tooltip title='Ver Lotes' placement='top'>
                                                    <AccountTreeIcon />
                                                </Tooltip>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton href={`/receitas/${recipe.recipe_id}`}>
                                                <Tooltip title='Editar' placement='top'>
                                                    <EditIcon />
                                                </Tooltip>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={() => {this.confirmDelete(recipe)}}>
                                                <Tooltip title='Excluir' placement='top'>
                                                    <DeleteIcon />
                                                </Tooltip>
                                           </IconButton>
                                        </Grid>
                                    </Grid>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={this.state.total}
                    rowsPerPage={10}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                />
                <ConfirmDialog 
                    title='Confirmação para excluir Receita' 
                    children={<Typography> Você realmente quer excluir a receita <b>{this.state.selected.name}</b>? Essa ação não poderá ser desfeita.</Typography>}
                    open={this.state.openDeleteDialog}
                    setOpen={this.setOpenDeleteDialog}
                    onConfirm={this.deleteSelectedRecipe}
                    id={this.state.selected.recipe_id}
                />
            </React.Fragment>
        );
    }
}

export default ListRecipePages;
