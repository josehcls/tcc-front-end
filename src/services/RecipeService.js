import api from '../utils/Api';
import { trackPromise } from 'react-promise-tracker';

export const getRecipes = () =>
trackPromise(
    api({
        url: 'http://127.0.0.1:8082/recipe-service/v1/recipes',
        method: 'GET',
        params: {
        },
        // expectToken: true
    }).then((resp) => {
        return resp.data;
    })
)
