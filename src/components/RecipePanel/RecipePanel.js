import React from "react";
import "./RecipePanel.css";

const RecipePanel = (props) => {
	const recipeQuery = props.info.title.split(" ").join("+") + "+recipe";
	return (
		<div className="card" style={{width: "400px", height: "340px", marginBottom: "20px"}}>
			<img className="card-img-top" src={props.info.image} alt={props.info.title}/>
			<div className="card-body">
				<h5 className="card-title">{props.info.title}</h5>
				<a href={"https://www.google.com/search?q=" + recipeQuery} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Go to Recipe</a>
			</div>
		</div>
	)
}

export default RecipePanel;