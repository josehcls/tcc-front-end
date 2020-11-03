import api from '../utils/Api';
import { trackPromise } from 'react-promise-tracker';

export const getRecipes = () =>
trackPromise(
    api({
        url: 'http://127.0.0.1:8082/recipe-service/v1/recipes',
        method: 'GET',
        params: {},
    }).then((resp) => {
        return resp.data;
    })
)

export const getRecipe = (recipeId) =>
trackPromise(
    api({
        url: `http://127.0.0.1:8082/recipe-service/v1/recipes/${recipeId}`,
        method: 'GET',
        params: {},
    }).then((resp) => {
        return resp.data;
    })
)

export const postRecipe = (recipe) => 
trackPromise(
    api({
        url: `http://127.0.0.1:8082/recipe-service/v1/recipes`,
        method: 'POST',
        data: recipe,
    }).then((resp) => {
        return resp.data;
    })
)
