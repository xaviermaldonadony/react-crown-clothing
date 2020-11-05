import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
	// how are we able to pass state ?
	isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const ColectionPageContainer = compose(
	connect(mapStateToProps),
	withSpinner
)(CollectionPage);

export default ColectionPageContainer;

// in shop.component this component gets rendered before
// componentDidMount, selectIsCollectionFetching uses its default
// value which is false
// passing this value in the spinner will cause it not to render it
// it will render our wrapped component with it's props shop as null
// causing an error, we need to add a different selector to solve this
