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
			image: null
		}
	}

	handleChange = event => {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	getRecipes = () => {
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

	handleSubmit = event => {
		event.preventDefault();
		this.getRecipes();
	}

	fileChangeHandler = event => {
		if(event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onloadend = () => {
				let str = reader.result;
				this.setState({
					image: str.substring(23, str.length)
				});
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	uploadHandler = event => {
		event.preventDefault();
		console.log(this.state.image);
		let imageLabels = "";
		let requestBody = {
			"requests":[
				{
					"image":{
						"content": this.state.image
					},
					"features":[
						{
							"type":"LABEL_DETECTION",
							"maxResults": 3
						}
					]
				}
			]
		};
		fetch("https://vision.googleapis.com/v1/images:annotate?key=" + process.env.REACT_APP_GOOGLE_VISION_API_KEY, {
			method: "POST",
			headers: {	
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		}
	)
	.then(response => response.json())
	.then(data => {
		let labels = data.responses[0].labelAnnotations;
		labels.forEach(label => {
			imageLabels += label.description + " ";
		});
		this.setState({
			value: imageLabels
		});
		this.getRecipes();
	})
	.catch(err => {
		console.log("ERROR:", err);
	})

	}
	render() {
		let results = this.state.recipes.map(
			(item => {
				return (
				 <li key = {item.id}>
					 <RecipePanel info={item}/>
				</li>
				);
			})
		)
		if(this.state.recipes.length === 0) {
			results = <h1>No recipes here</h1>
		}
		return (
			<div>
				<form>
					<div>
						<input
							className="text-field"
							type="text"
							name="value"
							placeholder="Enter ingredients here"
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<br />
						<button onClick = {this.handleSubmit}>
							Find Recipes
						</button>
					</div>
				</form>
				<form>
					<input type="file" name="picture" onChange={this.fileChangeHandler}></input>
					<button onClick={this.uploadHandler}>Upload</button>
				</form>
				<ul className="results">
					{results}
				</ul>
			</div>
		)
	}
}

export default RecipeResults;