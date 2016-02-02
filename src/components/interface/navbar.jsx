import React from 'react';

class NavBar extends React.Component{
    render() {
    	return (
    		<nav>
    			<div className="nav__like"><span className="icon-user"></span></div>
    			<div className="nav__logo">
		    		<h1 className="nav__logosmall">vpro<span className="oranje">tinder</span>licht</h1>
    			</div>
    			<div className="nav__loves"><span className="icon-heart-header"></span></div>
    		</nav>
		);
	}
}

export default NavBar;
