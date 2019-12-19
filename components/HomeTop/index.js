import Link from 'next/link';
import classnames from 'classnames';
const { SITE_NAME } = require('../../config');

import MaxWidth from '../MaxWidth';

import './index.css';

const HomeTop = () => (
	<div className="content">
	<div className="home-1">
		<div className="text_home-1">
			<img src={require("../../static/maroad_2.png")} className="logo_home-1"/>
			<p className="word1_home-1">EN ILE-DE-FRANCE</p>
			<p className="word2_home-1">LES ETUDIANTS SE MOBILISENT</p>
			<p className="word3_home-1">SENSIBILISATION | RENCONTRE | ASISTANCE</p>
			<div className="cta_home-1">PARTICIPER A UNE MARAUDE</div>
		</div>
		<img src={require("../../static/background_banner.png")} className="background_banner"/>
	</div>
	<div className="home-2">
	<MaxWidth>
		<h2>NOTRE <span className="color-orange">MISSION</span></h2>
		<div className="content_home-2">
			<div className="left_home-2">
				<div className="left2_home-2">
					<div className="block_home-2">
						<h3>« Le plus dur à la rue c’est la solitude. La solitude 
			ça tue. Un sourire c’est du réconfort »</h3>
						<p><span className="color-orange">Notre objectif</span> est de venir en aide aux personnes <span className="color-orange">sans-abris</span> en mettant en relation des <span className="color-orange">étudiants de différentes écoles</span> pour l’organisation de maraudes. Ma-Road part d’un constat simple : le contact humain est très important.
						</p>
					</div>
				</div>
				<div className="nav_home-2">
					<div>
						<p>DÉCOUVRIR</p>
						<p>QUI<br />
						<span className="color-orange">SOMMES-NOUS ?</span></p>
					</div>
					<hr />
					<div>
						<p>DÉCOUVRIR</p>
						<p>LES<br />
							<span className="color-orange">TÉMOIGNAGES</span></p>
					</div>
					<hr />

					<div>
						<p>DÉCOUVRIR</p>
						<p>LE GUIDE<br />
						<span className="color-orange"s>DU MARAUDEUR</span></p>
					</div>
				</div>
			</div>
			<div>
				<img src={require("../../static/mission_background.png")} className="background_mission"/>
			</div>
		</div>
	</MaxWidth>
	</div>
	<div className="home-3">
		<MaxWidth>
			<div className="partners_home-3">
				<img src={require("../../static/partners/logo-hetic-horizontal.png")}/>
				<img src={require("../../static/partners/logo-hetic-horizontal.png")}/>
			</div>
		</MaxWidth>
	</div>
	<div className="home-4">
		<MaxWidth>
		<h2>DERNIERS <span className="color-orange">ARTICLES</span></h2>
		<div className="min_home-4">
			<div>
				<div><img src={require("../../static/min/patrick.png")}/></div>
				<h3 className="title_home-4">TÉMOIGNAGE</h3>
				<p>Découvrez l’histoire de Patrick, sans abris depuis 10 ans.</p>
			</div>
			<div>
				<div>
					<div><img src={require("../../static/min/article1.png")}/></div>
					<h3 className="title_home-4">ARTICLES</h3>
					<p>Je suis un titre d’article.</p>
				</div>
				<div>
					<div>
						<div><img src={require("../../static/min/article2.png")}/></div>
						<h3 className="title_home-4">ARTICLES</h3>
						<p>Je suis un titre d’article.</p>
					</div>
					<div>
						<div className="interarticle_home-4">
							<h3>DÉCOUVREZ<br />
							<span className="min_span_home-4">DE NOUVEAUX</span><br />
							<span>ARTICLES</span></h3>
							<div className="cta_home-4">EN SAVOIR PLUS</div>				
						</div>
					</div>
				</div>
			</div>
		</div>
		</MaxWidth>
	</div>
	</div>
);

export default HomeTop;
