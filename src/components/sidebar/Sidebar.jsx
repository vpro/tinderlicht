import React from 'react';

import SidebarItem from './Sidebar-item.jsx';
import Score from './Score.jsx';

class SideBar extends React.Component{
    render() {
		return (
			<div className="sidebar-container hidden-sm hidden-xs">
				<h3>Laatste antwoord</h3>
				<SidebarItem verluchtingen={this.props.verluchtingen} userData={this.props.userData} number="1"/>
				<SidebarItem verluchtingen={this.props.verluchtingen} userData={this.props.userData} number="2"/>
				<SidebarItem verluchtingen={this.props.verluchtingen} userData={this.props.userData} number="3"/>
				<Score userData={this.props.userData}/>
			</div>
		)
    }
}

export default SideBar;
