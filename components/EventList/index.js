import classnames from 'classnames';
import axios from 'axios';
import './index.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import Event from '../Event';
import Spinner from 'react-svg-spinner';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ReactMapboxGl, { Layer, Feature, Cluster, Marker } from 'react-mapbox-gl';

const EventList = () => {
	const [ save, setSave ] = useState([]);
	const [ events, setEvents ] = useState([]);
	const [ eventSelect, setEventSelect ] = useState([]);
	const [ activeFilter, setActiveFilter ] = useState(0);
	const [ showPopup, setShowPopup ] = useState(false);

	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');

	const [ mapActive, setMapActive ] = useState(false);

	const [ loaded, setLoaded ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ showPopupMap, setshowPopupMap ] = useState(false);
	const [ error, setError ] = useState('');

	const [ centerParis, setCenterParis ] = useState([ 2.349014, 48.8534 ]);
	const [ zoomParis, setZoomParis ] = useState([ 11 ]);

	const [ day, setDay ] = useState('');
	const [ month, setMonth ] = useState('');
	const [ year, setYear ] = useState('');
	const [ hours, setHours ] = useState('');

	const [ eventMap, setEventMap ] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let result = await axios('https://raphael-peralta.fr/maroad/wp-json/acf/v3/maraude');

			await result.data.map((event) => {
				axios(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.acf
						.start_place}.json?access_token=pk.eyJ1Ijoia2VyaWFucCIsImEiOiJjanIzb3RjYjQwZHBiNDlxb244bmhmMWttIn0.OOdv7-Uvd5NnModocJk0Bw`
				).then((response) => {
					console.log(response.data.features[0].center);
				});
			});
			setEvents(result.data);
			setSave(result.data);
			setEventSelect(result.data[0]);
			setDay(result.data[0].acf.date.split('/')[0]);
			setMonth(getMonth(result.data[0].acf.date.split('/')[1]));
			setYear(result.data[0].acf.date.split('/')[2].split(' ')[0]);
			setHours(result.data[0].acf.date.split(' ')[1].replace(':', 'h'));
		};

		fetchData();
	}, []);

	const coords = [ { coord: [ 2.33, 48.88 ] }, { coord: [ 2.315537, 48.827158 ] }, { coord: [ 2.42, 48.85 ] } ];

	const callback = (event) => {
		setEventSelect(event);
		setDay(event.acf.date.split('/')[0]);
		setMonth(getMonth(event.acf.date.split('/')[1]));
		setYear(event.acf.date.split('/')[2].split(' ')[0]);
		setHours(event.acf.date.split(' ')[1].replace(':', 'h'));
		setShowPopup(false);
		setSuccess(false);
	};

	const callbackByID = (id, coords) => {
		setshowPopupMap(true);
		setZoomParis([ 13 ]);
		setCenterParis(coords);
		setEventSelect(events[id]);
		setDay(events[id].acf.date.split('/')[0]);
		setMonth(getMonth(events[id].acf.date.split('/')[1]));
		setYear(events[id].acf.date.split('/')[2].split(' ')[0]);
		setHours(events[id].acf.date.split(' ')[1].replace(':', 'h'));
		setShowPopup(false);
		setSuccess(false);
	};

	const getMonth = (month) => {
		const monthInt = parseInt(month);
		switch (monthInt) {
			case 1:
				return 'janvier';
			case 2:
				return 'février';
			case 3:
				return 'mars';
			case 4:
				return 'avril';
			case 5:
				return 'mai';
			case 6:
				return 'juin';
			case 7:
				return 'juillet';
			case 8:
				return 'août';
			case 9:
				return 'septembre';
			case 10:
				return 'octobre';
			case 11:
				return 'novembree';
			case 12:
				return 'décembre';
		}
	};

	const headers = {
		headers: {
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcmFwaGFlbC1wZXJhbHRhLmZyXC9tYXJvYWQiLCJpYXQiOjE1NzY3ODkzNzEsIm5iZiI6MTU3Njc4OTM3MSwiZXhwIjoxNTc3Mzk0MTcxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIyIn19fQ.aXcb1Mg9Fc0VhJTw3eCKaChEACgehqMH7a8_KEa_Xus'
		}
	};

	const sendForm = async () => {
		await axios
			.post(
				'https://raphael-peralta.fr/maroad/wp-json/wp/v2/subscriptions',
				{
					title: eventSelect.acf.title,
					status: 'publish',
					fields: {
						nom: name,
						email,
						id_maraude: eventSelect.id,
						titre: eventSelect.acf.title
					}
				},
				headers
			)
			.then((response) => {
				axios
					.post(
						`https://raphael-peralta.fr/maroad/wp-json/wp/v2/maraude/${eventSelect.id}`,
						{
							fields: {
								participant: parseInt(eventSelect.acf.participant) + 1
							}
						},
						headers
					)
					.then((response) => {
						axios
							.post(
								'/api/sendmail',
								{
									event: eventSelect,
									name: name,
									email: email
								},
								{
									headers: {
										'Content-Type': 'application/json'
									}
								}
							)
							.then((response) => {
								console.log('success', response);
								setLoaded(false);
								setSuccess(true);
							})
							.catch((error) => {
								setLoaded(false);
								setError("Erreur lors de l'envoie du mail ! ");
							});
					})
					.catch((error) => {
						console.error('erreurr:', error);
					});
			})
			.catch((error) => {
				console.error('erreur :', error);
			});
	};

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

	const validateEmail = (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const formData = (e) => {
		e.preventDefault();
		if (validateEmail(email) && name.length !== 0) {
			sendForm();
			setLoaded(true);
			setError('');
		} else {
			setError("L'adresse email n'est pas correct!");
		}
	};

	const styles = {
		clusterMarker: {
			width: 40,
			height: 40,
			borderRadius: '50%',
			backgroundColor: '#51D5A0',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			color: 'white',
			fontSize: 20,
			fontWeight: 800,
			border: '1px solid #ededed',
			cursor: 'pointer'
		},
		marker: {
			width: 36,
			height: 36,
			backgroundImage: require('../../static/pointer-red.svg')
		},
		markerCommun: {
			width: 40,
			height: 40,
			borderRadius: '50%',
			color: '#fff',
			display: 'flex',
			fontSize: 20,
			fontWeight: 700,
			justifyContent: 'center',
			alignItems: 'center',
			border: '1px solid #ededed'
		},
		close: {
			fontSize: 18,
			position: 'absolute',
			right: 10,
			top: 10
		}
	};

	const Map = ReactMapboxGl({
		accessToken: 'pk.eyJ1Ijoia2VyaWFucCIsImEiOiJjanIzb3RjYjQwZHBiNDlxb244bmhmMWttIn0.OOdv7-Uvd5NnModocJk0Bw'
	});

	return (
		<div className="agenda">
			<div className="title">
				Liste des <span className="color-primary">événements</span>
			</div>
			<div className="filters">
				<div className="content-filters">
					<div onClick={() => setMapActive(false)} className={mapActive === false ? 'list active' : 'list'}>
						<img
							src={
								mapActive === false ? (
									require('../../static/list-active.svg')
								) : (
									require('../../static/list.svg')
								)
							}
						/>{' '}
						Liste
					</div>
					<div onClick={() => setMapActive(true)} className={mapActive === true ? 'list active' : 'list'}>
						<img
							src={
								mapActive === true ? (
									require('../../static/map-active.svg')
								) : (
									require('../../static/map.svg')
								)
							}
						/>{' '}
						Map
					</div>
				</div>
				<div>
					Filter par :
					<span className={activeFilter === 0 ? 'active' : ''} onClick={() => filterCallback(0)}>
						Tous
					</span>
					<span className={activeFilter === 1 ? 'active' : ''} onClick={() => filterCallback(1)}>
						Disponibles
					</span>{' '}
				</div>
			</div>
			{!mapActive ? (
				<div className="container-space">
					{events.length !== 0 && eventSelect.length !== 0 ? (
						<React.Fragment>
							<div className="col-5">
								{events.map((event) => {
									if (window.innerWidth < 800) {
										return (
											<AnchorLink offset="30" className="none-href" href="#anchor">
												<Event
													key={event.id}
													callback={callback}
													activeEl={eventSelect.id}
													event={event}
												/>
											</AnchorLink>
										);
									} else {
										return (
											<Event
												key={event.id}
												callback={callback}
												activeEl={eventSelect.id}
												event={event}
											/>
										);
									}
								})}
							</div>
							<div className="col-5">
								{eventSelect.length !== 0 ? !showPopup ? (
									<div className="box-event" id="anchor">
										<div className="box-event__title">{eventSelect.acf.title}</div>
										<div className="box-event__info">
											<span className="info">
												<img className="icon-info" src={require('../../static/calendar.svg')} />
												{day} {month} {year} - {hours}
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
											<div className="title-box">Contact: {eventSelect.acf.contact} </div>
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
													<li>Habilliez vous chaudement</li>
													<li>Ramenez ce que vous souhaitez</li>
												</ul>
											</div>
										</div>
										{eventSelect.acf.participant !== eventSelect.acf.participation_max ? (
											<div onClick={() => setShowPopup(true)} className="button-green">
												Je m'inscris
											</div>
										) : null}
									</div>
								) : (
									<div className="box-event active">
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
												{day} {month} {year} - {hours}
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
										{loaded ? (
											<div className="container-loader">
												<Spinner thickness={3} color="#ef5c35" size="64px" />
											</div>
										) : success ? (
											<div>
												Félicitation vous êtes désormais inscrit à la maraude ! Vous recevrez un
												mail avec toutes les informations nécessaires !
											</div>
										) : (
											<form onSubmit={formData}>
												{error !== '' ? (
													<div className="alert-error">
														<img src={require('../../static/alert-circle.svg')} /> {error}
													</div>
												) : null}
												<div className="group-input">
													<label>
														Nom <span className="color-red">*</span>:
													</label>
													<input
														onChange={(e) => setName(e.target.value)}
														name="nom"
														type="text"
														required
													/>
												</div>
												<div className="group-input">
													<label>
														Email <span className="color-red">*</span>:
													</label>
													<input
														onChange={(e) => setEmail(e.target.value)}
														name="email"
														type="email"
														required
													/>
												</div>

												<div className="alert">
													<img src={require('../../static/alert-circle.svg')} />
													En vous inscrivant vous consentez à respecter l’ensemble des
													consignes
												</div>

												<div className="group-input">
													<input
														value="Confirmer l'inscription"
														className="button-green"
														type="submit"
													/>
												</div>
												<div className="clear" />
											</form>
										)}
									</div>
								) : null}
							</div>
						</React.Fragment>
					) : (
						<div className="container-loader">
							<Spinner thickness={3} color="#ef5c35" size="64px" />
						</div>
					)}
				</div>
			) : (
				<div className="map">
					<Map
						style="mapbox://styles/mapbox/light-v10"
						containerStyle={{
							height: '80vh',
							width: '100%',
							position: 'relative'
						}}
						center={centerParis}
						zoom={zoomParis}
					>
						<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
							<Feature coordinates={[ 48.8534, 2.349014 ]} />
						</Layer>
						{events.map((coord, key) => (
							<Marker
								key={key}
								className="marker"
								onClick={() => callbackByID(key, [ coord.acf.longitude, coord.acf.latitude ])}
								coordinates={[ coord.acf.longitude, coord.acf.latitude ]}
							>
								{' '}
							</Marker>
						))}
					</Map>
					{showPopupMap ? (
						<div className="popup">
							<div className="close" onClick={() => setshowPopupMap(false)}>
								<img src={require('../../static/x.svg')} />
							</div>
							{eventSelect.length !== 0 ? !showPopup ? (
								<div className="box-event" id="anchor">
									<div className="box-event__title">{eventSelect.acf.title}</div>
									<div className="box-event__info">
										<span className="info">
											<img className="icon-info" src={require('../../static/calendar.svg')} />
											{day} {month} {year} - {hours}
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
										<div className="title-box">Contact: {eventSelect.acf.contact} </div>
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
												<li>Habilliez vous chaudement</li>
												<li>Ramenez ce que vous souhaitez</li>
											</ul>
										</div>
									</div>
									{eventSelect.acf.participant !== eventSelect.acf.participation_max ? (
										<div onClick={() => setShowPopup(true)} className="button-green">
											Je m'inscris
										</div>
									) : null}
								</div>
							) : (
								<div className="box-event active">
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
											{day} {month} {year} - {hours}
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
									{loaded ? (
										<div className="container-loader">
											<Spinner thickness={3} color="#ef5c35" size="64px" />
										</div>
									) : success ? (
										<div>
											Félicitation vous êtes désormais inscrit à la maraude ! Vous recevrez un
											mail avec toutes les informations nécessaires !
										</div>
									) : (
										<form onSubmit={formData}>
											{error !== '' ? (
												<div className="alert-error">
													<img src={require('../../static/alert-circle.svg')} /> {error}
												</div>
											) : null}
											<div className="group-input">
												<label>
													Nom <span className="color-red">*</span>:
												</label>
												<input
													onChange={(e) => setName(e.target.value)}
													name="nom"
													type="text"
													required
												/>
											</div>
											<div className="group-input">
												<label>
													Email <span className="color-red">*</span>:
												</label>
												<input
													onChange={(e) => setEmail(e.target.value)}
													name="email"
													type="email"
													required
												/>
											</div>

											<div className="alert">
												<img src={require('../../static/alert-circle.svg')} />
												En vous inscrivant vous consentez à respecter l’ensemble des consignes
											</div>

											<div className="group-input">
												<input
													value="Confirmer l'inscription"
													className="button-green"
													type="submit"
												/>
											</div>
											<div className="clear" />
										</form>
									)}
								</div>
							) : null}
						</div>
					) : null}
				</div>
			)}
		</div>
	);
};

export default EventList;
