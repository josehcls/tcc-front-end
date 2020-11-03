import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Tooltip from '@material-ui/core/Tooltip';

import Title from '../components/Title';
import moment from "moment";

import * as RecipeService from '../services/RecipeService'

class ListRecipePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        RecipeService.getRecipes().then((data) => {
            this.setState({
                ...this.state,
                data: data,
            });
        });
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
                            <TableCell>Nome da Receita</TableCell>
                            <TableCell>Estilo</TableCell>
                            <TableCell>Cadastrada Por</TableCell>
                            <TableCell>Cadastrada Em</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((recipe) => (
                            <TableRow key={recipe.recipe_id}>
                                <TableCell>{recipe.name}</TableCell>
                                <TableCell>{recipe.style}</TableCell>
                                <TableCell>{recipe.created_by}</TableCell>
                                <TableCell>{moment(recipe.created_at).format("DD/MM/YYYY hh:mm")}</TableCell>
                                <TableCell>
                                    <IconButton href={`/receitas/${recipe.recipe_id}`}>
                                        <Tooltip title='Editar' placement='top'>
                                            <EditIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton href={`/receitas/${recipe.recipe_id}/lotes`}>
                                        <Tooltip title='Ver Lotes' placement='top'>
                                            <AccountTreeIcon />
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default ListRecipePages;
