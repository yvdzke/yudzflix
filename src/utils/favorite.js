const KEY = "favorites";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const isFavorite = (movieId) => {
  const favorites = getFavorites();
  return favorites.some((m) => m.id === movieId);
};

export const addFavorite = (movie) => {
  const favorites = getFavorites();
  if (!favorites.some((m) => m.id === movie.id)) {
    const updated = [...favorites, movie];
    localStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  }
  return favorites;
};

export const removeFavorite = (movieId) => {
  const updated = getFavorites().filter((m) => m.id !== movieId);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};
