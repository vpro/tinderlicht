import React from 'react';
import closeIcon from '../../assets/icons/close.svg';

class ImageTagging extends React.Component{
    render() {
		return (
        		<ul className="imagetagging">
        			<li className="metadatatitle">Voeg hieraan toe</li>
	        		<li className="metadescription">
                        <span className="tag"><img className="close-icon" src={closeIcon}/> TAG 1</span>
                        <span className="iconclass-tag">David communicating with God; David praying (in general)</span>
                    </li>
                    <li className="metadescription">Lazarus</li>
                    <li className="metadescription">Jezus</li>
        		</ul>
		)
    }
}

export default ImageTagging;
