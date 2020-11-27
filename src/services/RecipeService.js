import api from '../utils/Api';
import { trackPromise } from 'react-promise-tracker';

const SERVICE_URL = 'http://localhost:5000'

export const getRecipes = (page, size) =>
trackPromise(
    api({
        url: SERVICE_URL + '/v1/recipes',
        method: 'GET',
        params: {page: page, size: size},
    }).then((resp) => {
        return resp.data;
    })
)

export const getBatches = (recipeId, page, size) =>
trackPromise(
    api({
        url: SERVICE_URL + `/v1/recipes/${recipeId}/batches`,
        method: 'GET',
        params: {page: page, size: size},
    }).then((resp) => {
        return resp.data;
    })
)

export const getRecipe = (recipeId) =>
trackPromise(
    api({
        url: SERVICE_URL + `/v1/recipes/${recipeId}`,
        method: 'GET',
        params: {},
    }).then((resp) => {
        return resp.data;
    })
)

export const postRecipe = (recipe) => 
trackPromise(
    api({
        url: `http://127.0.0.1:5000/v1/recipes`,
        method: 'POST',
        data: recipe,
    }).then((resp) => {
        return resp.data;
    })
)


export const putRecipe = (recipeId, recipe) => 
trackPromise(
    api({
        url: `http://127.0.0.1:5000/v1/recipes/${recipeId}`,
        method: 'PUT',
        data: recipe,
    }).then((resp) => {
        return resp.data;
    })
)

export const deleteRecipe = (recipeId) =>
trackPromise(
    api({
        url: `http://127.0.0.1:5000/v1/recipes/${recipeId}`,
        method: 'DELETE',
    }).then((resp) => {
        return resp.data;
    })
)
