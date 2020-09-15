export default class Favorites {
    constructor() {
        this.favorites = [];
    }

    addFavorite(id, name, image) {
        const newFavorite = {
            id,
            name,
            image
        }

        this.favorites.push(newFavorite);

        this.storeFavorites();

        return newFavorite;
    }

    removeFavorite(id) {
        const index = this.favorites.findIndex(f => f.id === id);

        this.favorites.splice(index, 1);

        this.storeFavorites();
    }

    isFavorite (id) {
        return this.favorites.findIndex(f => f.id === id) !== -1;
    }

    hasFavorites () {
        return this.favorites.length !== 0;
    }

    storeFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    readFavorites() {
        const stored = JSON.parse(localStorage.getItem('favorites'));

        if (stored) this.favorites = stored;
    }
}