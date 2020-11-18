import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import withSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.components';

const mapStateToProps = createStructuredSelector({
	// set the property to be named the one withSpinner is expecting
	isLoading: selectIsCollectionFetching,
});

// it's currying all of our functions, it evaluates from right to left
// it will evaluate withSpinner first by passing CollectionsOverview,
// and then passing all of that and then passing that to connect
// same as below
const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	withSpinner
)(CollectionsOverview);

// rewrite with compose
// const CollectionsOverviewContainer = connect(mapStateToProps)(
// 	withSpinner(CollectionsOverview)
// );

export default CollectionsOverviewContainer;

//Instead of mapping our mapStateToProps in our shop page or any component in general
// in order to pass that value into our collectionsOverViewWithSpinner as
// we named it before , we are going to wrap that mapStateToProps with this
// value around the collectionsOverViewWithSpinnger
// this container will have two levels of wrapping
