import React from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ClearIcon from '@material-ui/icons/Clear';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import * as RecipeService from '../services/RecipeService'
import * as BatchService from '../services/BatchService'

class BatchFormPage extends React.Component {
    constructor(props) {
        super(props);
        const {recipe_id, batch_id} = this.props.match.params;
        this.state = {
            batch: {
                name: "",
                misc: "",
                recipe: {},
                control_profile: {
                    name: "",
                    steps: []
                }
            },
            batch_id: batch_id,
            recipe_id: recipe_id,
            is_editing: false,
            openSnackBar: false,
            new_step: {
                value: null, 
                time_offset: null,
            }
        };
    }

    componentDidMount() {
        const is_editing = this.state.batch_id > 0;

        RecipeService.getRecipe(this.state.recipe_id).then((recipe) => {
            let batch = JSON.parse(JSON.stringify(this.state.batch));
            batch.recipe = recipe
            this.setState({
                batch: batch,
                batch_id: this.state.batch_id,
                recipe_id: this.state.recipe_id,
                is_editing: is_editing,
                openSnackBar: false,
                new_step: this.state.new_step,
            });
        });

        if (is_editing)
            BatchService.getBatch(this.state.batch_id).then((batch) => {
                this.setState({
                    batch: batch,
                    batch_id: this.state.batch_id,
                    recipe_id: this.state.recipe_id,
                    is_editing: this.state.is_editing,
                    openSnackBar: false,
                    new_step: this.state.new_step,
                });
            });
    }

    handleChange = (event) => { 
        let batch = JSON.parse(JSON.stringify(this.state.batch));
        batch[event.target.name] = event.target.value

        this.setState({
            batch: batch,
            batch_id: this.state.batch_id,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: false,
            new_step: this.state.new_step,
        });
    }

    handleNewStepChange = (event) => {
        let new_step = JSON.parse(JSON.stringify(this.state.new_step));
        new_step[event.target.name] = event.target.value
        this.setState({
            batch: this.state.batch,
            batch_id: this.state.batch_id,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: false,
            new_step: new_step,
        });
    }

    handleSave = () => {
        if (this.state.is_editing) {
            BatchService.putBatch(this.state.batch_id, this.state.batch).then((data) => {
                this.setState({
                    batch: data,
                    batch_id: data.batch_id,
                    recipe_id: this.state.recipe_id,
                    is_editing: true,
                    openSnackBar: true,
                    new_step: this.state.new_step,
                });
            });
        }
        else {
            BatchService.postBatch(this.state.batch).then((data) => {
                this.setState({
                    batch: data,
                    batch_id: data.batch_id,
                    recipe_id: this.state.recipe_id,
                    is_editing: true,
                    openSnackBar: true,
                    new_step: this.state.new_step,
                });
                this.props.history.replace({ pathname: `/receitas/${this.state.recipe_id}/lotes/${data.batch_id}`})
            });
        }
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            batch: this.state.batch,
            batch_id: this.state.batch_id,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: false,
            new_step: this.state.new_step,
        });
    };

    addStep = () => {
        const value = this.state.new_step.value;
        const timeOffset = this.state.new_step.time_offset;
        const step = {
            step: this.state.batch.control_profile.steps.length,
            variable: "TEMPERATURE", 
            value: value, 
            time_offset: timeOffset
        };
        let batch = JSON.parse(JSON.stringify(this.state.batch));
        batch.control_profile.steps = batch.control_profile.steps.concat([step]);
        this.setState({
            batch: batch,
            batch_id: this.state.batch_id,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: this.state.openSnackBar,
            new_step: {
                value: "", 
                time_offset: "",
            }
        });
    }

    removeStep = (step) => {
        let batch = JSON.parse(JSON.stringify(this.state.batch));
        let steps = batch.control_profile.steps.slice();
        for(var i=0; i<steps.length; i++) {
            if(steps[i].step == step) {                       
                steps.splice(i, 1);
            }
        }
        for(var i=0; i<steps.length; i++) {
            steps[i].step = i;
        }
        batch.control_profile.steps = steps;
        this.setState({
            batch: batch,
            batch_id: this.state.batch_id,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: this.state.openSnackBar,
            new_step: this.state.new_step,
        });
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/receitas">Receitas</Link>
                    <Link color="inherit" href={`/receitas/${this.state.recipe_id}`}>{this.state.batch.recipe.name}</Link>
                    <Link color="inherit" href={`/receitas/${this.state.recipe_id}/lotes/`}>Lotes</Link>
                    <Link color="inherit" href={`/receitas/${this.state.recipe_id}/lotes/${this.state.batch_id}`}>{this.state.batch_id == 0 ? 'Novo Lote' : this.state.batch.name}</Link>
                </Breadcrumbs>
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} />

                    <Grid item xs={2} />
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            required
                            id="name-input"
                            label="Nome"
                            fullWidth
                            onChange={this.handleChange}
                            name="name"
                            value={this.state.batch.name}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={2} />

                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <TextField
                            id="misc-input"
                            label="Descrição"
                            multiline
                            rows={8}
                            fullWidth
                            variant="outlined"
                            onChange={this.handleChange}
                            name="misc"
                            value={this.state.batch.misc ?? ""}
                        />
                    </Grid>
                    <Grid item xs={2} />

                    <Divider />

                    <Grid item xs={2} />
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom>
                            Controle de Temperatura
                        </Typography>
                    </Grid>
                    <Grid item xs={8} />

                    <Grid item xs={2} />
                    <Grid item xs={6} >
                        <Table>
                            <TableBody>
                                {this.state.batch.control_profile.steps.map((item) => (
                                    <TableRow>
                                        <TableCell>Manter em</TableCell>
                                        <TableCell>{item.value} °C</TableCell>
                                        <TableCell>por</TableCell>
                                        <TableCell>{item.time_offset} dias</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => this.removeStep(item.step)}>
                                                <Tooltip title='Remover passo' placement='right'>
                                                    <ClearIcon />
                                                </Tooltip>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={4} />

                    <Grid item xs={2} />

                    <Grid item xs={2}>
                        <TextField
                            id="outlined-adornment-temperature"
                            label="Manter em"
                            name="value"
                            onChange={this.handleNewStepChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                            }}
                            type='number'
                            inputProps={{
                            'aria-label': 'Temperatura',
                            }}
                            labelWidth={0}
                            variant="outlined"
                            value={this.state.new_step.value}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            id="outlined-adornment-time"
                            label="por"
                            type='number'
                            name="time_offset"
                            onChange={this.handleNewStepChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Dias</InputAdornment>,
                            }}
                            inputProps={{
                            'aria-label': 'Tempo',
                            }}
                            labelWidth={0}
                            variant="outlined"
                            value={this.state.new_step.time_offset}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <IconButton onClick={() => {this.addStep()}}>
                            <Tooltip title='Adicionar passo' placement='right'>
                                <AddBoxIcon />
                            </Tooltip>
                        </IconButton>
                    </Grid>

                    <Grid item xs={6} />

                    <Grid item xs={8} />
                    <Grid item xs={1}> 
                        <Button variant="contained" fullWidth href={`/receitas/${this.state.recipe_id}/lotes/`}>Voltar</Button>
                    </Grid>
                    <Grid item xs={1}> 
                        <Button variant="contained" color="primary" fullWidth onClick={this.handleSave}>Salvar</Button>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
                <Snackbar open={this.state.openSnackBar} autoHideDuration={4000} onClose={this.handleSnackBarClose}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.handleSnackBarClose} severity="success">
                        Lote salvo com sucesso!
                    </MuiAlert>
                </Snackbar>
            </React.Fragment>
        );
    }
}

export default BatchFormPage;
