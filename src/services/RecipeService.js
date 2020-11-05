import api from '../utils/Api';
import { trackPromise } from 'react-promise-tracker';

export const getRecipes = (page, size) =>
trackPromise(
    api({
        url: 'http://127.0.0.1:8082/recipe-service/v1/recipes',
        method: 'GET',
        params: {page: page, size: size},
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


export const putRecipe = (recipeId, recipe) => 
trackPromise(
    api({
        url: `http://127.0.0.1:8082/recipe-service/v1/recipes/${recipeId}`,
        method: 'PUT',
        data: recipe,
    }).then((resp) => {
        return resp.data;
    })
)

export const deleteRecipe = (recipeId) =>
trackPromise(
    api({
        url: `http://127.0.0.1:8082/recipe-service/v1/recipes/${recipeId}`,
        method: 'DELETE',
    }).then((resp) => {
        return resp.data;
    })
)
