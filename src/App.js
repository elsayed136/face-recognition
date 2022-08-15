import React from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Particle from './components/Particle/Particle';
import Rank from './components/Rank/Rank';

class App extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className='App'>
				<Particle />
				<Navigation />
				<Logo />
				<Rank name='Elsayed' entries={1} />
				<ImageLinkForm />
				{/* 
			<ImageLinkForm /> */}
			</div>
		);
	}
}

export default App;
