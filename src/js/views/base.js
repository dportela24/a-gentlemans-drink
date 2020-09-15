const elementsDOM = {
    searchForm: document.querySelector('.search'),
    searchType: document.querySelector('.search__type'),
    searchInput: document.querySelector('.search__field'),
    cocktailListContainer: document.querySelector('.results'),
    cocktailList: document.querySelector('.results__list'),
    pagesContainer: document.querySelector('.results__pages'),
    detailsContainer: document.querySelector('.details'),
    favoritesListIcon: document.querySelector('.favorites__field'),
    favoritesList: document.querySelector('.favorites__list')
};

const elementsStrings = {
    loading: 'loading',
    cocktailItem: 'results__link',
    cocktailItemFig: 'results__fig',
    cocktailItemData: 'results__data',
    cocktailItemName: 'results__name',
    buttonInline: 'btn-inline',
    searchIcon: 'search__icon',
    pageButton: 'results__btn',
    favoriteButton: 'details__favorite'
};

const loadingTemplate = `
    <div class="${elementsStrings.loading}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
`;

const cocktailListTemplate = (cocktail) => `
    <li>
    <a class="${elementsStrings.cocktailItem}" href="#${cocktail.idDrink}">
        <figure class="${elementsStrings.cocktailItemFig}">
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        </figure>
        <div class="${elementsStrings.cocktailItemData}">
            <h4 class="${elementsStrings.cocktailItemName}">${cocktail.strDrink}</h4>
        </div>
    </a>
    </li>
`;

const pageButtonTemplate = (currentPage, buttonType) => `
    <button class="${elementsStrings.buttonInline} ${elementsStrings.pageButton}--${buttonType}" data-newpage=${buttonType === 'next' ? currentPage + 1 : currentPage - 1}>
        <span>Page ${buttonType === 'next' ? currentPage + 1 : currentPage - 1}</span>
        <svg class="${elementsStrings.searchIcon}">
            <use href="img/icons.svg#icon-triangle-${buttonType === 'next' ? 'right' : 'left'}"></use>
        </svg>
    </button>
`;

const ingredientTemplate = (ingredientString) => `
    <li class="ingredient__item">
        <svg class="ingredient__icon">
            <use href="img/icons.svg#icon-ingredient"></use>
        </svg>
        <div class="ingredient__name">
            ${ingredientString}
        </div>
    </li>
`;

const instructionTemplate = (instructionString) => `
    <li class="instruction__item">
        <div class="details__instruction">
            ${instructionString}
        </div>
    </li>
`;

const detailsTemplate = (details) => `
    <div class="outer-border">
        <div class="middle-border">
            <div class="inner-border">
                <img class="corner-decoration corner-left-top" src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"></img>
                <img class="corner-decoration corner-right-top" src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"></img>
                <img class="corner-decoration corner-right-bottom" src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"></img>
                <img class="corner-decoration corner-left-bottom" src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"></img>
                <h1 class="details__title">
                    <span>${details.name}</span>
                </h1>
            </div>
        </div>
    </div>

    <div class="ola">
        <div class="details__general">
            <div class="details__info">
                <svg class="details__info-icon">
                    <use href="img/icons.svg#icon-iba"></use>
                </svg>
                <span class="details__info-data details__info-data">${details.iba}</span>
            </div>
            <div class="details__info">
                <svg class="details__info-icon">
                    <use href="img/icons.svg#icon-glass"></use>
                </svg>
                <span class="details__info-data details__info-data">${details.glass}</span>
            </div>
            <div class="details__info">
                <svg class="details__info-icon">
                    <use href="img/icons.svg#icon-alcoholic"></use>
                </svg>
                <span class="details__info-data details__info-data">${details.alcoholic}</span>
            </div>

            <button class="details__favorite">
                <svg class="header__favorites">
                    <use href="img/icons.svg#${details.isFavorite ? "icon-heart" : "icon-heart-outlined"}"></use>
                </svg>
            </button>
        </div>

        <figure class="details__fig">
            <img src="${details.image}" alt="${details.name}" class="details__img">
        </figure>
    </div>

    <div class="separator__fig">
        <img src="img/separator.png" class="separator__img">
    </div>

    <div class="details__ingredients">
        <h2 class="heading-2">Ingredients</h2>

        <ul class="details__ingredient-list">
            ${details.ingredientsHTML}
        </ul>
    </div>

    <div class="separator__fig">
        <img src="img/separator.png" class="separator__img">
    </div>

    <div class="details__directions">
        <h2 class="heading-2">How to prepare it</h2>

        <ol class="details__instructions-list">
            ${details.instructionsHTML}
        </ol>
    </div>
`;

const favoriteTemplate = (favorite) => `
    <li>
        <a class="favorites__link" href="#${favorite.id}">
            <figure class="favorites__fig">
                <img src="${favorite.image}" alt="Test">
            </figure>
            <div class="favorites__data">
                <h4 class="favorites__name">${favorite.name}</h4>
            </div>
        </a>
    </li>
`;

export {
    elementsDOM,
    elementsStrings,
    cocktailListTemplate,
    loadingTemplate,
    pageButtonTemplate,
    ingredientTemplate,
    instructionTemplate,
    detailsTemplate,
    favoriteTemplate
}