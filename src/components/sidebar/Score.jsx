import React from 'react';

class Score extends React.Component{
    render() {
		return (
			<div className="Score">
				<h3>Score</h3>
				<span>{this.props.userData.gameData.score}</span>
			</div>
		)
    }
}

export default Score;
