import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
	[selectShop],
	(shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	// get all the keys, map over that array of keys, so we get the value of
	// the colections object at that key whihc returns an array
	(collections) =>
		collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
	createSelector([selectCollections], (collections) =>
		collections ? collections[collectionUrlParam] : null
	);

export const selectIsCollectionFetching = createSelector(
	[selectShop],
	(shop) => shop.isFetching
);
