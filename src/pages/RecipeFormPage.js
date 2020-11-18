import React from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as RecipeService from '../services/RecipeService'


class RecipeFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                name: "",
                style: "",
                misc: "",
            },
            is_editing: false,
            recipe_id: 0,
            openSnackBar: false,
        };
    }

    componentDidMount() {
        const {recipe_id} = this.props.match.params;
        const is_editing = recipe_id > 0;
        this.setState({
            recipe: this.state.recipe,
            recipe_id: recipe_id,
            is_editing: is_editing,
            openSnackBar: false,
        });

        if (is_editing)
            RecipeService.getRecipe(recipe_id).then((data) => {
                this.setState({
                    recipe: data,
                    recipe_id: this.state.recipe_id,
                    is_editing: this.state.is_editing,
                    openSnackBar: false,
                });
            });
    }

    handleChange = (event) => { 
        let recipe = JSON.parse(JSON.stringify(this.state.recipe));
        recipe[event.target.name] = event.target.value

        this.setState({
            recipe: recipe,
            recipe_id: this.state.recipe_id,
            is_editing: this.state.is_editing,
            openSnackBar: false,
        });
    }

    handleSave = () => {
        if (this.state.is_editing) {
            RecipeService.putRecipe(this.state.recipe_id, this.state.recipe).then((data) => {
                this.setState({
                    recipe: data,
                    recipe_id: data.recipe_id,
                    is_editing: true,
                    openSnackBar: true,
                });
            });
        }
        else {
            RecipeService.postRecipe(this.state.recipe).then((data) => {
                this.setState({
                    recipe: data,
                    recipe_id: data.recipe_id,
                    is_editing: true,
                    openSnackBar: true,
                });
                this.props.history.replace({ pathname: `/receitas/${data.recipe_id}`})
            });
        }
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
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
                    <Link color="inherit" href={`/receitas/${this.state.recipe_id}`}>{this.state.recipe_id == 0 ? 'Nova Receita' : this.state.recipe.name}</Link>
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
                            value={this.state.recipe.name}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            required
                            id="style-input"
                            label="Estilo"
                            fullWidth
                            onChange={this.handleChange}
                            name="style"
                            value={this.state.recipe.style}
                            autoComplete="off"
                        />
                    </Grid>
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
                            value={this.state.recipe.misc ?? ""}
                        />
                    </Grid>
                    <Grid item xs={2} />

                    <Grid item xs={8} />
                    <Grid item xs={1}> 
                        <Button variant="contained" fullWidth href='/receitas'>Cancelar</Button>
                    </Grid>
                    <Grid item xs={1}> 
                        <Button variant="contained" color="primary" fullWidth onClick={this.handleSave}>Salvar</Button>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
                <Snackbar open={this.state.openSnackBar} autoHideDuration={4000} onClose={this.handleSnackBarClose}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.handleSnackBarClose} severity="success">
                        Receita salva com sucesso!
                    </MuiAlert>
                </Snackbar>
            </React.Fragment>
        );
    }
}

export default RecipeFormPage;
