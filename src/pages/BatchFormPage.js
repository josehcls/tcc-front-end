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
                control_profile: {}
            },
            batch_id: batch_id,
            recipe: {},
            recipe_id: recipe_id,
            is_editing: false,
            openSnackBar: false,
        };
    }

    componentDidMount() {
        const is_editing = this.state.batch_id > 0;

        RecipeService.getRecipe(this.state.recipe_id).then((recipe) => {
            this.setState({
                batch: {
                    name: "",
                    misc: "",
                    control_profile: {}
                },
                batch_id: this.state.batch_id,
                recipe: recipe,
                recipe_id: this.state.recipe_id,
                is_editing: is_editing,
                openSnackBar: false,
            });
        });

        if (is_editing)
            BatchService.getBatch(this.state.batch_id).then((batch) => {
                this.setState({
                    batch: batch,
                    batch_id: this.state.batch_id,
                    recipe: this.state.recipe,
                    recipe_id: this.state.recipe_id,
                    is_editing: this.state.is_editing,
                    openSnackBar: false,
                });
            });
    }

    handleChange = (event) => { 
        let batch = JSON.parse(JSON.stringify(this.state.batch));
        batch[event.target.name] = event.target.value

        this.setState({
            batch: batch,
            batch_id: this.state.batch_id,
            recipe: this.state.recipe,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: false,
        });
    }

    handleSave = () => {
        if (this.state.is_editing) {
            BatchService.putBatch(this.state.batch_id, this.state.batch).then((data) => {
                this.setState({
                    batch: data,
                    batch_id: data.batch_id,
                    recipe: this.state.recipe,
                    recipe_id: this.state.recipe_id,
                    is_editing: true,
                    openSnackBar: true,
                });
            });
        }
        else {
            BatchService.postBatch(this.state.batch).then((data) => {
                this.setState({
                    batch: data,
                    batch_id: data.batch_id,
                    recipe: this.state.recipe,
                    recipe_id: this.state.recipe_id,
                    is_editing: true,
                    openSnackBar: true,
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
            recipe: this.state.recipe,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: false,
        });
    };

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/receitas">Receitas</Link>
                    <Link color="inherit" href={`/receitas/${this.state.recipe_id}`}>{this.state.recipe.name}</Link>
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
                            rows={16}
                            fullWidth
                            variant="outlined"
                            onChange={this.handleChange}
                            name="misc"
                            value={this.state.batch.misc ?? ""}
                        />
                    </Grid>
                    <Grid item xs={2} />

                    {/* Controle: [ Int ] [  Dropdown, horas, dias ] [ float ]oC, Botão para '+', lista dinâmica */}
                    {/* <List> */}
                        {/* <ListItem> */}
                        <Grid item xs={2} />

                        <Grid item xs={1}>
                            <Typography variant="h5" gutterBottom>
                                Manter em
                            </Typography>
                        </Grid>
                         
                        <Grid item xs={1}>
                            <OutlinedInput
                                id="outlined-adornment-temperature"
                                // value={values.weight}
                                // onChange={handleChange('weight')}
                                endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                                // aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'Temperatura',
                                }}
                                labelWidth={0}
                            />
                        </Grid>

                        <Grid item xs={1}>
                            <Typography variant="h5" gutterBottom>
                                Após
                            </Typography>
                        </Grid>

                        <Grid item xs={1}>
                            <TextField 
                                id="outlined-basic" 
                                // label="Outlined" 
                                variant="outlined" 
                            />

                        </Grid>

                        <Grid item xs={1}>
                            <TextField
                                id="outlined-select-time-unit"
                                select
                                label="Tempo"
                                // value={currency}
                                // onChange={handleChange}
                                style={{width:100}}
                                variant="outlined"
                                >
                                {[{value: 'Horas'}, {value: 'Dias'}].map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={5} />
                        {/* </ListItem> */}
                    {/* </List> */}

                    {/*  */}
                     
                    {/* Controle: [ Int ] [  Dropdown, horas, dias ] [ float ]oC, Botão para '+', lista dinâmica */}
                    {/* <List> */}
                        {/* <ListItem> */}
                        <Grid item xs={2} />

                        <Grid item xs={1}>
                            <Typography variant="h5" gutterBottom>
                                Manter em
                            </Typography>
                        </Grid>
                         
                        <Grid item xs={1}>
                            <OutlinedInput
                                id="outlined-adornment-temperature"
                                // value={values.weight}
                                // onChange={handleChange('weight')}
                                endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                                // aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'Temperatura',
                                }}
                                labelWidth={0}
                            />
                        </Grid>

                        <Grid item xs={1}>
                            <Typography variant="h5" gutterBottom>
                                Após
                            </Typography>
                        </Grid>

                        <Grid item xs={1}>
                            <TextField 
                                id="outlined-basic" 
                                // label="Outlined" 
                                variant="outlined" 
                            />

                        </Grid>

                        <Grid item xs={1}>
                            <TextField
                                id="outlined-select-time-unit"
                                select
                                label="Tempo"
                                // value={currency}
                                // onChange={handleChange}
                                style={{width:100}}
                                variant="outlined"
                                >
                                {[{value: 'Horas'}, {value: 'Dias'}].map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={5} />
                        {/* </ListItem> */}
                    {/* </List> */}

                    {/*  */}

                    <Grid item xs={8} />
                    <Grid item xs={1}> 
                        <Button variant="contained" fullWidth href={`/receitas/${this.state.recipe_id}/lotes/`}>Cancelar</Button>
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
