import classnames from 'classnames';
import axios from 'axios';
import './index.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import Event from '../Event';

const EventList = () => {
	const [ save, setSave ] = useState([]);
	const [ events, setEvents ] = useState([]);
	const [ eventSelect, setEventSelect ] = useState([]);
	const [ activeFilter, setActiveFilter ] = useState(0);
	const [ showPopup, setShowPopup ] = useState(false);

	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://localhost:8888/wordpress/wp-json/acf/v3/maraude');
			console.log(result.data);
			setEvents(result.data);
			setSave(result.data);
			setEventSelect(result.data[0]);
		};
		fetchData();
	}, []);

	const callback = (event) => {
		setEventSelect(event);
	};

	const handleChange = (key, value) => {};

	const filterCallback = (idFilter) => {
		// 0 = Tous
		// 1 = Disponibles
		switch (idFilter) {
			case 0:
				setEvents(save);
				break;
			case 1:
				setEvents(events.filter((event) => event.acf.participant !== event.acf.participation_max));
				break;
		}
		setActiveFilter(idFilter);
	};

	const formData = (e) => {
		e.preventDefault();
		console.log(email, name);
	};

	return (
		<div className="agenda">
			<div className="title">
				Liste des <span className="color-primary">événements</span>
			</div>
			<div className="filters">
				Filter par :
				<span className={activeFilter === 0 ? 'active' : ''} onClick={() => filterCallback(0)}>
					Tous
				</span>
				<span className={activeFilter === 1 ? 'active' : ''} onClick={() => filterCallback(1)}>
					Disponibles
				</span>{' '}
			</div>
			<div className="container-space">
				<div className="col-5">
					{events.map((event) => {
						return <Event key={event.id} callback={callback} activeEl={eventSelect.id} event={event} />;
					})}
				</div>
				<div className="col-5">
					{eventSelect.length !== 0 ? !showPopup ? (
						<div className="box-event">
							<div className="box-event__title">{eventSelect.acf.title}</div>
							<div className="box-event__info">
								<span className="info">
									<img className="icon-info" src={require('../../static/calendar.svg')} />
									29 décembre 2019 - 10h30
								</span>
								<span className="info">
									<img className="icon-info" src={require('../../static/place.svg')} />
									{eventSelect.acf.start_place}
								</span>
								<span className="info">
									<img className="icon-info" src={require('../../static/users.svg')} />
									{eventSelect.acf.participant} / {eventSelect.acf.participation_max}
								</span>
							</div>
							<div className="box-event__orga">
								<div className="title-box">Organisateurs: </div>
								<div
									className="text-sample"
									dangerouslySetInnerHTML={{ __html: eventSelect.acf.organisateurs }}
								/>
							</div>
							<div className="box-event__orga">
								<div className="title-box">Messages des organisateurs: </div>
								<div
									className="text-sample"
									dangerouslySetInnerHTML={{ __html: eventSelect.acf.description }}
								/>
							</div>
							<div className="box-event__orga">
								<div className="title-box">Rappel des consignes: </div>
								<div className="content-rules">
									<ul>
										<li>Ne soyez pas en retard</li>
										<li>Écouter les responsables de l'événement</li>
									</ul>
									<ul>
										<li>Ne soyez pas en retard</li>
										<li>Écouter les responsables de l'événement</li>
									</ul>
								</div>
							</div>
							<div onClick={() => setShowPopup(true)} className="button-green">
								Je m'inscris
							</div>
						</div>
					) : (
						<div className="box-event">
							<div className="back" onClick={() => setShowPopup(false)}>
								<img
									className="chevron-black"
									alt="Voir plus"
									src={require('../../static/chevron-right2.svg')}
								/>Retour
							</div>
							<div className="box-event__title-princip color-primary">Inscription</div>
							<div className="box-event__title">{eventSelect.acf.title}</div>
							<div className="box-event__info">
								<span className="info">
									<img className="icon-info" src={require('../../static/calendar.svg')} />
									29 décembre 2019 - 10h30
								</span>
								<span className="info">
									<img className="icon-info" src={require('../../static/place.svg')} />
									{eventSelect.acf.start_place}
								</span>
								<span className="info">
									<img className="icon-info" src={require('../../static/users.svg')} />
									{eventSelect.acf.participant} / {eventSelect.acf.participation_max}
								</span>
							</div>
							<div className="ruler" />

							<form onSubmit={formData}>
								<div className="group-input">
									<label>Nom *</label>
									<input onChange={(e) => setName(e.target.value)} name="nom" type="text" />
								</div>
								<div className="group-input">
									<label>Email *</label>
									<input onChange={(e) => setEmail(e.target.value)} name="email" type="email" />
								</div>

								<div className="group-input">
									<input value="Confirmer l'inscription" className="green-button" type="submit" />
								</div>
							</form>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

const FormEvent = () => {
	return <div className="form-event">d</div>;
};

export default EventList;
