import React from 'react';

import SidebarItem from './Sidebar-item.jsx';

class SideBar extends React.Component{
    render() {
		return (
			<div className="sidebar-container">
				<h3>Laatste antwoord</h3>
				<SidebarItem />
			</div>
		)
    }
}

export default SideBar;
