import React, { Component } from 'react';
import './index.css';

const ContactForm = () => {
	return (
		<div className="space-between">
			<div className="col-5">
				<div className="title">
					Contactez <span className="color-primary">nous</span>
				</div>
				<p>
					Nous serons ravis de répondre à vos questions si vous avez besoin d’aide. Peut etre faire un texte
					plus long et mieux ecris
				</p>
				<div className="list">
					<img src={require('../../static/map-pin.svg')} /> 122 Rue de Tolbiac, 75013 Paris
				</div>
				<div className="list">
					<img src={require('../../static/phone.svg')} /> <span className="green-color">01.45.68.89.55</span>{' '}
					Lun. - Ven. de 9h00 à 17h30
				</div>
				<div className="list">
					<img src={require('../../static/mail.svg')} />{' '}
					<span className="green-color">ma-road@support.com</span>
				</div>
			</div>
			<div className="col-5">
				<form className="form">
					<div className="group-input">
						<label>
							Nom <span className="color-red">*</span>:
						</label>
						<input onChange={(e) => setName(e.target.value)} name="nom" type="text" required />
					</div>
					<div className="group-input">
						<label>
							Email <span className="color-red">*</span>:
						</label>
						<input onChange={(e) => setEmail(e.target.value)} name="email" type="email" required />
					</div>
					<div className="group-input">
						<label>
							Message <span className="color-red">*</span>:
						</label>
						<textarea name="nom" required />
					</div>

					<div className="group-input">
						<input value="Envoyer" className="button-green" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
