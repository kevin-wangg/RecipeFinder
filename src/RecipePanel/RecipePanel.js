import React from "react";
import RecipeResults from "../RecipeResults/RecipeResults";

const RecipePanel = (props) => {
	return (
		<div>
			<h1>{props.info.title}</h1>
			<img src = {props.info.image}/>
			<p>{props.info.instructions}</p>
		</div>
	)
}

export default RecipePanel;