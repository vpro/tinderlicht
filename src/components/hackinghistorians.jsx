import React from "react";
import LeafletContainer from "./LeafletContainer.jsx";
import InterfaceContainer from "./InterfaceContainer.jsx";


class HackingHistorians extends React.Component{
    render() {
        return (
        	<div className="app-container">
        		<InterfaceContainer />
        		<LeafletContainer />
        	</div>);
    }
}

export default HackingHistorians;
