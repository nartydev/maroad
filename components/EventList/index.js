import classnames from 'classnames';
import axios from 'axios';
import './index.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import Event from '../Event';
import Spinner from 'react-svg-spinner';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const EventList = () => {
	const [ save, setSave ] = useState([]);
	const [ events, setEvents ] = useState([]);
	const [ eventSelect, setEventSelect ] = useState([]);
	const [ activeFilter, setActiveFilter ] = useState(0);
	const [ showPopup, setShowPopup ] = useState(false);

	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');

	const [ loaded, setLoaded ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ error, setError ] = useState('');

	const [ day, setDay ] = useState('');
	const [ month, setMonth ] = useState('');
	const [ year, setYear ] = useState('');
	const [ hours, setHours ] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('https://raphael-peralta.fr/maroad/wp-json/acf/v3/maraude');
			console.log(result.data);
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

	const callback = (event) => {
		setEventSelect(event);
		setDay(event.acf.date.split('/')[0]);
		setMonth(getMonth(event.acf.date.split('/')[1]));
		setYear(event.acf.date.split('/')[2].split(' ')[0]);
		setHours(event.acf.date.split(' ')[1].replace(':', 'h'));
    setShowPopup(false);
    setSuccess(false)
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
            axios.post('/api/sendmail', {
              event: eventSelect,
              name: name,
              email: email
            }, { headers: {
              'Content-Type': 'application/json'
            } }).then((response) => {
              console.log('success', response);
              setLoaded(false)
              setSuccess(true)
            }).catch((error) => {
              setLoaded(false)
              setError("Erreur lors de l'envoie du mail ! ")
            })
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
  } 

	const formData = (e) => {
    e.preventDefault();
    if(validateEmail(email) && name.length !== 0) {
      sendForm();
      setLoaded(true)
      setError('')
    } else {
      setError("L'adresse email n'est pas correct!");
    }
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
				{events.length !== 0 && eventSelect.length !== 0 ? (
					<>
						<div className="col-5">
							{events.map((event) => {
                if(window.innerWidth < 800) {
                  return (
                    <AnchorLink
                    offset="30"
                    className="none"
                    href="#anchor"
                    >
									    <Event key={event.id} callback={callback} activeEl={eventSelect.id} event={event} />
                    </AnchorLink>
								);
              } else {
                return (
                  <Event key={event.id} callback={callback} activeEl={eventSelect.id} event={event} />
                  )
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
                      {
                        error !== '' ? (
                          <div className="alert-error">
                            <img src={require('../../static/alert-circle.svg')} /> {error}
                          </div>
                        ) : null
                      }
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
					</>
				) : (
					<div className="container-loader">
						<Spinner thickness={3} color="#ef5c35" size="64px" />
					</div>
				)}
			</div>
		</div>
	);
};

export default EventList;
