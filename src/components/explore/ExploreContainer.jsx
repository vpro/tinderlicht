import React from 'react';
import Masonry from 'react-masonry-component';

var masonryOptions = {
    transitionDuration: 0
};

class Gallery extends React.Component{
    render() {
        var childElements = this.props.elements.map(function(element){
           return (
                <li className="image-element-class">
                    <img src={element.src} />
                </li>
            );
        };

        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
            >
                {childElements}
            </Masonry>
        );
    }
});

export default Gallery;
