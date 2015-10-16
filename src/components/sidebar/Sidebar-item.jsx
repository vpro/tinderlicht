import React from 'react';
import goodIcon from '../../icons/good.svg';

class SidebarItem extends React.Component{
    render() {
		return (
		<div>	
			<img className="prev-image" src="http://resolver.kb.nl/resolve?urn=BYVANCKB:mimi_66b13:002r_min_02&role=thumbnail"/>
			<img className="goed" src={goodIcon}/>
		</div>
		)
    }
}

export default SidebarItem;
