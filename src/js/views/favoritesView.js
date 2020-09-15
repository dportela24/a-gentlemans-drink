import { elementsDOM, elementsStrings, favoriteTemplate } from './base';

const toggleFavoriteButton = isFavorite => {
    const iconName = isFavorite ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector(`.${elementsStrings.favoriteButton} use`).setAttribute('href', `img/icons.svg#${iconName}`);
}

const toggleFavoritesList = hasFavorites => {
    elementsDOM.favoritesListIcon.style.visibility = hasFavorites ? 'visible' : 'hidden';
}

const renderFavorite = favorite => {
    const html = favoriteTemplate(favorite);

    elementsDOM.favoritesList.insertAdjacentHTML('afterbegin', html);
}

const removeFavorite = id => {
    const favorite = elementsDOM.favoritesList.querySelector(`a[href="#${id}"`).parentElement;

    if (favorite) favorite.parentElement.removeChild(favorite);
}

export {
    toggleFavoriteButton,
    toggleFavoritesList,
    renderFavorite,
    removeFavorite
}