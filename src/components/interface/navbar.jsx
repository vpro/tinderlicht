import React from 'react';

import tinderlicht from '../../assets/icons/tinderlicht.svg';


class NavBar extends React.Component{
    render() {
    	return (
    		<nav>
    			<div className="nav__like"></div>
    			<div className="nav__logo">
                    <img className="nav__tinderlichtlogo" src={tinderlicht} />
    			</div>
    			<div className="nav__loves"></div>
    		</nav>
		);
	}
}

export default NavBar;
