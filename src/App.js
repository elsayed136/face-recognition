import React from 'react';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Particle from './components/Particle/Particle';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';

const API_KEY = '91abc3eca8924846bdb35175e83768ca';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			boxes: [],
			route: 'signin',
			isSignedIn: false,
		};
	}

	calculateFaceLocation = data => {
		const clarifaiFaces = data.outputs[0].data.regions.map(
			region => region.region_info.bounding_box
		);
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);

		console.log(clarifaiFaces);

		return clarifaiFaces.map(faceLocation => ({
			leftCol: faceLocation.left_col * width,
			topRow: faceLocation.top_row * height,
			rightCol: width - faceLocation.right_col * width,
			bottomRow: height - faceLocation.bottom_row * height,
		}));
	};

	displayFaceBox = boxes => {
		this.setState({ boxes: boxes });
	};

	onInputChange = event => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = event => {
		this.setState({ imageUrl: this.state.input });
		const raw = JSON.stringify({
			inputs: [
				{
					data: {
						image: {
							url: this.state.input,
						},
					},
				},
			],
		});

		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: 'Key ' + API_KEY,
			},
			body: raw,
		};

		fetch(
			`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
			requestOptions
		)
			.then(response => response.json())
			.then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
			.catch(error => console.log('error', error));
	};

	onRouteChange = route => {
		if (route === 'signout') {
			this.setState({ isSignedIn: false });
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, route, imageUrl, boxes } = this.state;

		return (
			<div className='App'>
				<Particle />
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === 'home' ? (
					<>
						<Logo />
						<Rank name='Elsayed' entries={1} />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition boxes={boxes} imageUrl={imageUrl} />
					</>
				) : route === 'signin' ? (
					<Signin onRouteChange={this.onRouteChange} />
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}
			</div>
		);
	}
}

export default App;
