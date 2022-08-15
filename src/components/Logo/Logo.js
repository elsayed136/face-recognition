import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt
				className='logo flex items-center justify-center br2 shadow-2'
				style={{
					height: '150px',
					width: '150px',
				}}
				tiltMaxAngleX={25}
				tiltMaxAngleY={25}
			>
				<div>
					<img src={brain} alt='Brain Logo' />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
