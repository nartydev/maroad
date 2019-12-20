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
					<img src={require('../../static/phone.svg')} /> 01.45.68.89.55 Lun. - Ven. de 9h00 à 17h30
				</div>
				<div className="list">
					<img src={require('../../static/mail.svg')} /> ma-road@support.com
				</div>
			</div>
			<div className="col-5" />
		</div>
	);
};

export default ContactForm;
