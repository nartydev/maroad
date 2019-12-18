import React, { Component } from 'react';
import './index.css';

const Event = ({ event }) => {
	console.log(event.acf.date.split('/'));

	const getMonth = (month) => {
		const monthInt = parseInt(month);
		switch (monthInt) {
			case 1:
				return 'jan';
			case 2:
				return 'févr';
			case 3:
				return 'mars';
			case 4:
				return 'avr';
			case 5:
				return 'mai';
			case 6:
				return 'juin';
			case 7:
				return 'juill';
			case 8:
				return 'août';
			case 9:
				return 'sept';
			case 10:
				return 'oct';
			case 11:
				return 'nov';
			case 12:
				return 'dec';
		}
	};

	const day = event.acf.date.split('/')[0];
	const month = getMonth(event.acf.date.split('/')[1]);

	const hours = event.acf.date.split(' ')[1].replace(':', 'h');

	return (
		<div className="card-event">
			<div className="content-start">
				<div className="card-date">{day}</div>
				<div className="card-month-hour">
					{month} {hours}
				</div>
			</div>
			<div className="card-border" />
			<div className="card-global-info">
				<div className="card-name">{event.acf.title}</div>
				<div className="card-place">{event.acf.start_place}</div>
				<div className="card-details" />
			</div>
			<div className="card-participants">
				<span className="color-green">
					{event.acf.participant} / {event.acf.participation_max}
				</span>{' '}
				participants
			</div>
			<div className="card-read">
				<img className="chevron-right" alt="Voir plus" src={require('../../static/chevron-right.svg')} /> En
				voir plus
			</div>
		</div>
	);
};

export default Event;
