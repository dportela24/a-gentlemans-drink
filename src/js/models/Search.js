import axios from 'axios';

export default class Search {
    constructor(input, type) {
        this.input = input;
        this.type = type;
    };

    async getResults() {
        try {
            let url;
            if (this.type === 'name') {
                url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.input}`;
            } else {
                url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.input}`;
            }
            
            const response = await axios(url);

            this.result = response.data.drinks;

        } catch (e) {
            alert(e);
        }
    }
}