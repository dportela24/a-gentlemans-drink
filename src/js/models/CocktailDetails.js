import axios from 'axios';
import { instructionTemplate } from '../views/base';

export default class CocktailDetails {
    constructor(id, isFavorite) {
        this.id = id;
        this.isFavorite = isFavorite;
    }

    async getDetails() {
        try {
            const response = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`);

            const result = response.data.drinks[0];

            this.name = result.strDrink;
            this.image = result.strDrinkThumb;
            
            this.iba = result.strIBA ? result.strIBA : 'Non-IBA';
            this.glass = result.strGlass;
            this.category = result.strCategory;
            this.alcoholic = result.strAlcoholic;
            
            this.ingredients = new Array();
            for (let i = 1; i <= 15; i++ ) {
                const ingredient = result[`strIngredient${i}`];
                
                if (ingredient) {
                    const measure = result[`strMeasure${i}`];
                    this.ingredients.push({
                        ingredient,
                        measure
                    })
                } else {
                    break;
                }
            }

            var instructions = result.strInstructions;
            instructions = instructions.replace(/[0-9]*\. ?/g, '.');
            instructions = instructions.split('.');
            instructions = instructions.filter( instruction => instruction)
            instructions = instructions.map( instruction => {
                let newInstruction = instruction.charAt(0).toUpperCase() + instruction.slice(1);

                newInstruction = newInstruction.replace(/ *$/, '');

                if (!newInstruction.endsWith('.') && !newInstruction.endsWith('!')) newInstruction  += '.';

                return newInstruction;
            })

            this.instructions = instructions;
        } catch (e) {
            console.log(e);
            alert('Could not retrieve cocktail information...')
        }
    }
}