import { elementsDOM, elementsStrings, detailsTemplate, ingredientTemplate, loadingTemplate, instructionTemplate } from "./base";

const createIngredientsHTML = ingredients => {
    return ingredients.map( ingredient => {
        let ingredientString = "";

        if (ingredient.measure) {
            ingredientString = ingredient.measure + ' of ';
        }

        ingredientString += ingredient.ingredient;

        return ingredientTemplate(ingredientString);
    }).join(' ');
}

const createInstructionsHTML = instructions => {
   return instructions.map( instruction => {
        return instructionTemplate(instruction);
    }).join(' ');
}

const renderDetails = details => {
    details.ingredientsHTML = createIngredientsHTML(details.ingredients);
    details.instructionsHTML = createInstructionsHTML(details.instructions);
    const html = detailsTemplate(details);

    delete details.ingredientsHTML;
    delete details.instructionsHTML;

    elementsDOM.detailsContainer.insertAdjacentHTML('afterbegin', html);
};

const clear = () => {
    elementsDOM.detailsContainer.innerHTML = "";
}

const renderLoading = () => {
    elementsDOM.detailsContainer.insertAdjacentHTML('afterbegin', loadingTemplate);
}

const clearLoading = () => {
    const loadingElement = elementsDOM.detailsContainer.querySelector(`.${elementsStrings.loading}`);

    if (loadingElement) loadingElement.parentElement.removeChild(loadingElement);
}

export {
    renderDetails,
    renderLoading,
    clear,
    clearLoading
}