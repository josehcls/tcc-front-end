import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
            this.setState({data: data,});
        });
    }

    render() {
        return (
            <React.Fragment>
                <Title>Receitas</Title>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome da Receita</TableCell>
                            <TableCell>Estilo</TableCell>
                            <TableCell>Cadastrada Por</TableCell>
                            <TableCell>Cadastrada Em</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((recipe) => (
                            <TableRow key={recipe.recipe_id}>
                                <TableCell>{recipe.name}</TableCell>
                                <TableCell>{recipe.style}</TableCell>
                                <TableCell>{recipe.created_by}</TableCell>
                                <TableCell>{moment(recipe.created_at).format("DD/MM/YYYY hh:mm")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default ListRecipePages;
