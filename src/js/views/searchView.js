import { elementsDOM, elementsStrings, cocktailListTemplate, loadingTemplate, pageButtonTemplate } from './base';

const getInput = () => elementsDOM.searchInput.value;

const getType = () => elementsDOM.searchType.value;

const renderCocktail = (cocktail) => {
    const html = cocktailListTemplate(cocktail);
    
    elementsDOM.cocktailList.insertAdjacentHTML('beforeend', html);
}

const renderPageButtons = (page, totalItems, itemsPerPage) => {
    const numberPages = Math.ceil(totalItems / itemsPerPage);

    if (numberPages <= 1) return;

    let buttonsHTML = "";

    if (page !== 1) {
        buttonsHTML += pageButtonTemplate(page, 'prev')
    }
     
    if (page !== numberPages) {
        buttonsHTML += pageButtonTemplate(page, 'next');
    }

    elementsDOM.pagesContainer.insertAdjacentHTML('afterbegin', buttonsHTML);
}

const renderCocktailList = (cocktailList, page = 1, itemsPerPage = 10) => {
    clearCocktailList();

    const firstItem = (page - 1) * itemsPerPage;
    const lastItem = page * itemsPerPage;
    
    cocktailList.slice(firstItem, lastItem).forEach(renderCocktail)

    renderPageButtons(page, cocktailList.length, itemsPerPage);
}

const highlightSelected = id => {
    const previousHighlight = elementsDOM.cocktailList.querySelector('.results__link--active');

    if (previousHighlight) previousHighlight.classList.remove('results__link--active');

    elementsDOM.cocktailList.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

const clearInput = () => {
    elementsDOM.searchInput.value = "";
}

const clearCocktailList = () => {
    elementsDOM.cocktailList.innerHTML = "";
    elementsDOM.pagesContainer.innerHTML = "";
}

const clear = () => {
    clearInput(),
    clearCocktailList();
}

const renderLoading = () => {
    elementsDOM.cocktailListContainer.insertAdjacentHTML('afterbegin', loadingTemplate);
}

const clearLoading = () => {
    const loadingElement = elementsDOM.cocktailListContainer.querySelector(`.${elementsStrings.loading}`);

    if (loadingElement) loadingElement.parentElement.removeChild(loadingElement);
}

export {
    getInput,
    clear,
    getType,
    renderCocktailList,
    renderLoading,
    highlightSelected,
    clearLoading
}