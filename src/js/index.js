import Search from './models/Search';
import CocktailDetails from './models/CocktailDetails';
import Favorites from './models/Favorites';
import { elementsDOM, elementsStrings } from './views/base';
import * as searchView from './views/searchView';
import * as detailsView from './views/detailsView';
import * as favoritesView from './views/favoritesView';

const store = {};

/**
 * SEARCH / LIST CONTROLLER
 */

const searchControl = async () => {
    const searchType = searchView.getType();
    const searchInput = searchView.getInput();
    
    if (searchInput) {
        store.search = new Search(searchInput, searchType);
        
        searchView.clear();
        searchView.renderLoading();

        try {
            await store.search.getResults();

            searchView.clearLoading();
            searchView.renderCocktailList(store.search.result);
        } catch {
            alert('Could not get list of cocktails...')
        }
    }
}

elementsDOM.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchControl();
})

elementsDOM.pagesContainer.addEventListener('click', e => {
    const button = e.target.closest(`.${elementsStrings.buttonInline}`)

    if (button) {
        const newPage = parseInt(button.dataset.newpage);

        searchView.renderCocktailList(store.search.result, newPage);
    }
})

/**
 * DETAILS CONTROLLER
 */

 const detailsControl = async () => {
     const id = window.location.hash.replace('#','');
     if (id) {
        let isFavorite = false;

        if (store.favorites) isFavorite = store.favorites.isFavorite(id);

        store.details = new CocktailDetails(id, isFavorite);

        if (store.search) searchView.highlightSelected(id);  

        detailsView.clear();
        detailsView.renderLoading();

        try {
            await store.details.getDetails();

            detailsView.clearLoading();
            detailsView.renderDetails(store.details)
        } catch (e) {
            console.log(e);
            alert('Could not get cocktail\'s details...');
        }
     }
 }

 window.addEventListener('hashchange', detailsControl);

 /**
 * FAVORITES CONTROLLER
 */

const favoritesControl = () => {
    if (!store.favorites) store.favorites = new Favorites();
    const favoriteID = store.details.id;

    if (!store.favorites.isFavorite(favoriteID)) { 
        const newFavorite = store.favorites.addFavorite(
            favoriteID,
            store.details.name,
            store.details.image
        );

        favoritesView.toggleFavoriteButton(true);

        favoritesView.renderFavorite(newFavorite);
        
    } else {
        store.favorites.removeFavorite(favoriteID);
        favoritesView.toggleFavoriteButton(false);
        favoritesView.removeFavorite(favoriteID);
    }

    favoritesView.toggleFavoritesList(store.favorites.hasFavorites());
}

const initFavorites = () => {
    store.favorites = new Favorites();

    store.favorites.readFavorites();

    favoritesView.toggleFavoritesList(store.favorites.hasFavorites());

    store.favorites.favorites.forEach( favorite => favoritesView.renderFavorite(favorite));
}

 elementsDOM.detailsContainer.addEventListener( 'click', e => {
     if (e.target.matches(`.${elementsStrings.favoriteButton}, .${elementsStrings.favoriteButton} *`)) {
        favoritesControl();
     }
 })

 window.addEventListener('load', () => {
    initFavorites(),
    detailsControl()
})
