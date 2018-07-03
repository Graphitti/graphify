import axios from 'axios';

export const getSocrataCategories = () => {
    return axios.get('https://api.us.socrata.com/api/catalog/v1/categories')
    .then(res => res.data.results)
    .then(categories => {
        return categories.map(category => category.category)
    })
    .catch(console.error);
}

export const searchSocrataForDatasets = (search, category) => {
    return axios.get(`https://api.us.socrata.com/api/catalog/v1?only=datasets&q=${search}&categories=${category}`)
    .then(res => res.data)
    .catch(console.error);
}




