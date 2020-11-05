import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
import Title from '../components/Title';
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
            recipe_id: null,
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
                    <Title>Receita</Title>
                </Typography>
                <Grid container spacing={3}>
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
                        <Autocomplete 
                            freeSolo
                            disableClearable
                            id="style-input"
                            options={styles.map((option) => option.name)}
                            value={this.state.recipe.style}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    label="Estilo"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="style"
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2} />

                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <TextField
                            id="misc-input"
                            label="Misc"
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

const styles = [
    { key: "altbier", name: "Altbier" },
    { key: "amber", name: "Amber ale" },
    { key: "barley", name: "Barley wine" },
    { key: "berliner", name: "Berliner Weisse" },
    { key: "biere", name: "Bière de Garde" },
    { key: "bitter", name: "Bitter" },
    { key: "blonde", name: "Blonde Ale" },
    { key: "bock", name: "Bock" },
    { key: "brown", name: "Brown ale" },
    { key: "california", name: "California Common/Steam Beer" },
    { key: "cream", name: "Cream Ale" },
    { key: "dortmunder", name: "Dortmunder Export" },
    { key: "doppelbock", name: "Doppelbock" },
    { key: "dunkel", name: "Dunkel" },
    { key: "dunkelweizen", name: "Dunkelweizen" },
    { key: "eisbock", name: "Eisbock" },
    { key: "flanders", name: "Flanders red ale" },
    { key: "golden", name: "Golden/Summer ale" },
    { key: "gose", name: "Gose" },
    { key: "gueuze", name: "Gueuze" },
    { key: "hefeweizen", name: "Hefeweizen" },
    { key: "helles", name: "Helles" },
    { key: "india", name: "India pale ale" },
    { key: "kolsch", name: "Kölsch" },
    { key: "lambic", name: "Lambic" },
    { key: "light", name: "Light ale" },
    { key: "maibock", name: "Maibock/Helles bock" },
    { key: "malt", name: "Malt liquor" },
    { key: "mild", name: "Mild" },
    { key: "oktoberfestbier", name: "Oktoberfestbier/Märzenbier" },
    { key: "old", name: "Old ale" },
    { key: "oud", name: "Oud bruin" },
    { key: "pale", name: "Pale ale" },
    { key: "pilsener", name: "Pilsener/Pilsner/Pils" },
    { key: "porter", name: "Porter" },
    { key: "red", name: "Red ale" },
    { key: "roggenbier", name: "Roggenbier" },
    { key: "saison", name: "Saison" },
    { key: "scotch", name: "Scotch ale" },
    { key: "stout", name: "Stout" },
    { key: "schwarzbier", name: "Schwarzbier" },
    { key: "vienna", name: "Vienna lager" },
    { key: "witbier", name: "Witbier" },
    { key: "weissbier", name: "Weissbier" },
    { key: "weizenbock", name: "Weizenbock" },
    { key: "fruit", name: "Fruit beer" },
    { key: "herb", name: "Herb and spiced beer" },
    { key: "honey", name: "Honey beer" },
    { key: "rye", name: "Rye Beer" },
    { key: "smoked", name: "Smoked beer" },
    { key: "vegetable", name: "Vegetable beer" },
    { key: "wild", name: "Wild beer" },
    { key: "wood", name: "Wood-aged beer" },
]

export default RecipeFormPage;
