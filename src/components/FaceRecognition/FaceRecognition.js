import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
	return (
		<div className='center '>
			<div className='absolute mt2'>
				{imageUrl && (
					<img
						id='inputimage'
						src={imageUrl}
						alt='Face Recognition'
						width={500}
						height={'auto'}
					/>
				)}

				{boxes.map((box, i) => (
					<div
						key={i}
						className='bounding-box'
						style={{
							top: box.topRow,
							right: box.rightCol,
							bottom: box.bottomRow,
							left: box.leftCol,
						}}
					></div>
				))}
			</div>
		</div>
	);
};

export default FaceRecognition;
