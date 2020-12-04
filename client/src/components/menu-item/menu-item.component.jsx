import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
	<div
		className={`${size ? `${size} ` : ''}menu-item`}
		onClick={() => history.push(`${match.url}${linkUrl}`)}
	>
		<div
			className='background-image'
			style={{
				backgroundImage: `url(${imageUrl})`,
			}}
		/>
		<div className='content'>
			<h1 className='title'>{title.toUpperCase()}</h1>
			<span className='subtitle'>SHOP NOW</span>
		</div>
	</div>
);

// withRouter, is a hoc we warp our component with it and now we have access.
// Now we have access to the router properties, location, match, history...
export default withRouter(MenuItem);
