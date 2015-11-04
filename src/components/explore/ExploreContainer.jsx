import React from 'react';
import Masonry from 'react-masonry-component';

var masonryOptions = {
    transitionDuration: 0
};

class Gallery extends React.Component{
    render() {
        var records = this.props.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record;

        var childElements = records.map(function(element, index){
            console.log(element);

            if (element.hasOwnProperty('srw$recordData')) {
                var image = element.srw$recordData.srw_dc$dc.dc$identifier.$t;
                return (
                    <li key={index} className="image-element-class">
                        <img src={image} />
                    </li>
                );
            }
        });

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
}

export default Gallery;
