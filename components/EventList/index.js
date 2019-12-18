import classnames from 'classnames';
import axios from 'axios';
import './index.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import Event from '../Event';

const EventList = () => {
	const [ events, setEvents ] = useState([]);
	const [ eventSelect, setEventSelect ] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://localhost:8888/wordpress/wp-json/acf/v3/maraude');
			console.log(result.data);
			setEvents(result.data);
			setEventSelect(result.data[0]);
		};
		fetchData();
	}, []);

	return (
		<div className="agenda">
			<div className="title">
				Liste des <span className="color-primary">événements</span>
			</div>
			<FiltersAgenda />
			<div className="container-space">
				<div className="col-5">
					{events.map((event) => {
						return <Event key={event.id} event={event} />;
					})}
				</div>
				<div className="col-5">
					{eventSelect.length !== 0 ? (
						<div className="box-event">
							<div className="box-event__info">
								<span className="info">
									<img src={require('../../static/calendar.svg')} />
									29 décembre 2019 - 10h30
								</span>
								<span className="info">
									<img src={require('../../static/place.svg')} />
									27 Bis Rue du Progrès, 93100 Montreuil
								</span>
								<span className="info">
									<img src={require('../../static/users.svg')} />
									6/ 35
								</span>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export const FiltersAgenda = () => <div className="filters" />;

export default EventList;
