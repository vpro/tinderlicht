import React from 'react';

import SidebarItem from './Sidebar-item.jsx';

class SideBar extends React.Component{
    render() {
		return (
			<div className="sidebar-container col-md-2">
				<h3>Laatste antwoorden</h3>
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
			</div>
		)
    }
}

export default SideBar;
