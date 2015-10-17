import React from 'react';

class ImageMetadata extends React.Component{
    render() {
		return (
        		<ul className="metadata">
        			<li className="metadatatitle">Title</li>
	        		<li className="metadescription">Three ravens dropping a roof tile in front of the feet of Tiberius Gracchus, seen as a bad omen</li>
        			<li className="metadatatitle">Country</li>
	        		<li className="metadescription">France</li>
        		</ul>
		)
    }
}

export default ImageMetadata;
