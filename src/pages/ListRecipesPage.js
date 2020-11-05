import React, { Component } from 'react'
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

import Title from '../components/Title';
import ConfirmDialog from '../components/ConfirmDialog';
import moment from "moment";

import * as RecipeService from '../services/RecipeService'

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
        RecipeService.getRecipes().then((data) => {
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
            RecipeService.getRecipes().then((data) => {
                this.setState({
                    data: data,
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
                    <Grid item xs={1}><Title>Receitas</Title></Grid>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={1}><Button variant="contained" color="primary" href={'/receitas/0'}>Adicionar</Button></Grid>
                </Grid>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nome da Receita</b></TableCell>
                            <TableCell><b>Estilo</b></TableCell>
                            <TableCell><b>Cadastrada Por</b></TableCell>
                            <TableCell><b>Cadastrada Em</b></TableCell>
                            <TableCell><b>Ações</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((recipe) => (
                            <TableRow key={recipe.recipe_id}>
                                <TableCell>{recipe.name}</TableCell>
                                <TableCell>{recipe.style}</TableCell>
                                <TableCell>{recipe.created_by}</TableCell>
                                <TableCell>{moment(recipe.created_at).format("DD/MM/YYYY HH:mm")}</TableCell>
                                <TableCell>
                                    <IconButton href={`/receitas/${recipe.recipe_id}/lotes`}>
                                        <Tooltip title='Ver Lotes' placement='top'>
                                            <AccountTreeIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton href={`/receitas/${recipe.recipe_id}`}>
                                        <Tooltip title='Editar' placement='top'>
                                            <EditIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton onClick={() => {this.confirmDelete(recipe)}}>
                                        <Tooltip title='Excluir' placement='top'>
                                            <DeleteIcon />
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
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
