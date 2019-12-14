import React from "react";
import "./RecipeResults.css";
import RecipePanel from "../RecipePanel/RecipePanel";

class RecipeResults extends React.Component {
	constructor() {
		super()
		this.state = {
			value: "",
			recipes: [],
			results: [],
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		const query = this.state.value.split(/[^A-Za-z]/).filter(item => item.length > 0).join			("%252C");
		fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?		number=5&ranking=1&ignorePantry=false&ingredients=" + query, {
				"method": "GET",
				"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_SPOONACULAR_API_KEY
			}
		})
		.then(response => response.json())
		.then(data => {
			this.setState({
				recipes: data,
			})
		})
		this.setState({
			results: this.state.recipes.map(
				(item => {
					return <li key = {item.id}>{item.title}</li>
				})
			)
		});
	}
	render() {
		const results = this.state.recipes.map(
			(item => {
				return (
				 <li key = {item.id}>
					 <RecipePanel info={item}/>
				</li>
				);
			})
		)
		return (
			<div>
				<form>
					<div>
						<input 
							type="text"
							name="value"
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<br />
						<button onClick = {this.handleSubmit}>
							Find Recipes
						</button>
					</div>
				</form>
				<ul className="results">
					{results}
				</ul>
			</div>
		)
	}
}

export default RecipeResults;