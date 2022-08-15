import Clarifai from 'clarifai';
import React from 'react';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Particle from './components/Particle/Particle';
import Rank from './components/Rank/Rank';

// const app = new Clarifai.App({
// 	apiKey: '91abc3eca8924846bdb35175e83768ca',
// });

const USER_ID = 'YOUR_USER_ID_HERE';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '91abc3eca8924846bdb35175e83768ca';
const APP_ID = 'YOUR_APP_ID_HERE';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
		};
	}

	calculateFaceLocation = data => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = box => {
		this.setState({ box: box });
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
				Authorization: 'Key ' + PAT,
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

	render() {
		const { imageUrl, box } = this.state;

		return (
			<div className='App'>
				<Particle />
				<Navigation />
				<Logo />
				<Rank name='Elsayed' entries={1} />
				<ImageLinkForm
					onInputChange={this.onInputChange}
					onButtonSubmit={this.onButtonSubmit}
				/>
				<FaceRecognition box={box} imageUrl={imageUrl} />
			</div>
		);
	}
}

export default App;
