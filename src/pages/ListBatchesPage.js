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
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';

import ConfirmDialog from '../components/ConfirmDialog';
import moment from "moment";

import * as RecipeService from '../services/RecipeService'
import * as BatchService from '../services/BatchService'

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


class ListBatchesPage extends Component {
    constructor(props) {
        super(props);
        const {recipe_id} = this.props.match.params;
        this.state = {
            data: [],
            recipe: {
                recipe_id: 0,
                name: '...',
            },
            recipe_id: recipe_id,
            openDeleteDialog: false,
            selected: {name: "", recipe_id: 0},
            page: 0,
            total: 0,
        };
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            data: this.state.data,
            recipe: this.state.recipe,
            recipe_id: this.state.recipe_id,
            openDeleteDialog: this.state.openDeleteDialog,
            selected: this.state.selected,
            page: newPage,
            total: this.state.total,
        });
      };

    setOpenDeleteDialog = (value) => {
        this.setState({
            data: this.state.data,
            recipe: this.state.recipe,
            recipe_id: this.state.recipe_id,
            openDeleteDialog: value,
            selected: this.state.selected,
            page: this.state.page,
            total: this.state.total,
        });
    }

    confirmDelete = (value) => {
        this.setState({
            data: this.state.data,
            recipe: this.state.recipe,
            recipe_id: this.state.recipe_id,
            openDeleteDialog: true,
            selected: value,
            page: this.state.page,
            total: this.state.total,
        });
    }

    componentDidMount = () => {
        RecipeService.getRecipe(this.state.recipe_id).then((recipe) => {
            RecipeService.getBatches(this.state.recipe_id, this.state.page, 10).then((data) => {
                this.setState({
                    data: data.content,
                    recipe: recipe,
                    recipe_id: this.state.recipe_id,
                    openDeleteDialog: this.state.openDeleteDialog,
                    selected: this.state.selected,
                    page: this.state.page,
                    total: data.totalElements,
                });
            })
        });
    }

    deleteSelectedBatch = () => {
        BatchService.deleteBatch(this.state.selected.batch_id).then(() => {
            RecipeService.getBatches(this.state.batch_id, this.state.page, 10).then((data) => {
                this.setState({
                    data: data.content,
                    recipe: this.state.recipe,
                    recipe_id: this.state.recipe_id,
                    openDeleteDialog: this.state.openDeleteDialog,
                    selected: {name: "", batch_id: 0},
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
                    <Grid item xs={6}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/receitas">Receitas</Link>
                            <Link color="inherit" href={`/receitas/${this.state.recipe.recipe_id}`}>{this.state.recipe.name}</Link>
                            <Link color="inherit" href={`/receitas/${this.state.recipe.recipe_id}/lotes`}>Lotes</Link>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={1}><Button variant="contained" color="secondary" href={`/receitas/${this.state.recipe_id}/lotes/0`}>Adicionar</Button></Grid>
                </Grid>
                <Box p={1} />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Identificação</b></StyledTableCell>
                            <StyledTableCell><b>Status</b></StyledTableCell>
                            <StyledTableCell><b>Iniciado Em</b></StyledTableCell>
                            <StyledTableCell><b>Finalizado Em</b></StyledTableCell>
                            {/* <StyledTableCell><b>Dispositivo</b></StyledTableCell> */}
                            {/* <StyledTableCell><b>Perfil de Controle</b></StyledTableCell> */}
                            <StyledTableCell><b>Ações</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((batch) => (
                            <StyledTableRow key={batch.batch_id}>
                                <StyledTableCell>{batch.name}</StyledTableCell>
                                <StyledTableCell>{batch.status}</StyledTableCell>
                                <StyledTableCell>{batch.started_at ? moment(batch.started_at).format("DD/MM/YYYY HH:mm") : "-"}</StyledTableCell>
                                <StyledTableCell>{batch.finished_at ? moment(batch.finished_at).format("DD/MM/YYYY HH:mm") : "-"}</StyledTableCell>
                                {/* <StyledTableCell>{batch.device.name}</StyledTableCell> */}
                                {/* <StyledTableCell>{batch.control_profile.name}</StyledTableCell> */}
                                <StyledTableCell>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <IconButton color='secondary' href={`/receitas/${batch.batch_id}/lotes`} disabled={batch.status !== 'STAND_BY'}>
                                                <Tooltip title='Associar a Dispositivo' placement='top'>
                                                    <FilterFramesIcon />
                                                </Tooltip>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton href={`/receitas/${this.state.recipe_id}/lotes/${batch.batch_id}`}>
                                                <Tooltip title='Editar' placement='top'>
                                                    <EditIcon />
                                                </Tooltip>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={() => {this.confirmDelete(batch)}}>
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
                    children={<Typography> Você realmente quer excluir o Lote <b>{this.state.selected.name}</b>? Essa ação não poderá ser desfeita.</Typography>}
                    open={this.state.openDeleteDialog}
                    setOpen={this.setOpenDeleteDialog}
                    onConfirm={this.deleteSelectedBatch}
                    id={this.state.selected.batch_id}
                />
            </React.Fragment>
        );
    }
}

export default ListBatchesPage;
