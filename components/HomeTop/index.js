import Link from 'next/link';
import classnames from 'classnames';
const { SITE_NAME } = require('../../config');

import MaxWidth from '../MaxWidth';

import './index.css';

const HomeTop = () => (
	<div class="content">
	<div class="home-1">
		<div class="text_home-1">
			<img src={require("../../static/maroad_2.png")} class="logo_home-1"/>
			<p class="word1_home-1">EN ILE-DE-FRANCE</p>
			<p class="word2_home-1">LES ETUDIANTS SE MOBILISENT</p>
			<p class="word3_home-1">SENSIBILISATION | RENCONTRE | ASISTANCE</p>
			<div class="cta_home-1">PARTICIPER A UNE MARAUDE</div>
		</div>
		<img src={require("../../static/background_banner.png")} class="background_banner"/>
	</div>
	<div class="home-2">
	<MaxWidth>
		<h2>NOTRE <span class="color-orange">MISSION</span></h2>
		<div class="content_home-2">
			<div class="left_home-2">
				<div class="left2_home-2">
					<div class="block_home-2">
						<h3>« Le plus dur à la rue c’est la solitude. La solitude 
			ça tue. Un sourire c’est du réconfort »</h3>
						<p><span class="color-orange">Notre objectif</span> est de venir en aide aux personnes <span class="color-orange">sans-abris</span> en mettant en relation des <span class="color-orange">étudiants de différentes écoles</span> pour l’organisation de maraudes. Ma-Road part d’un constat simple : le contact humain est très important.
						</p>
					</div>
				</div>
				<div class="nav_home-2">
					<div>
						<p>DÉCOUVRIR</p>
						<p>QUI<br />
						<span class="color-orange">SOMMES-NOUS ?</span></p>
					</div>
					<hr />
					<div>
						<p>DÉCOUVRIR</p>
						<p>LES<br />
							<span class="color-orange">TÉMOIGNAGES</span></p>
					</div>
					<hr />

					<div>
						<p>DÉCOUVRIR</p>
						<p>LE GUIDE<br />
						<span class="color-orange"s>DU MARAUDEUR</span></p>
					</div>
				</div>
			</div>
			<div>
				<img src={require("../../static/mission_background.png")} class="background_mission"/>
			</div>
		</div>
	</MaxWidth>
	</div>
	<div class="home-3">
		<MaxWidth>
			<div class="partners_home-3">
				<img src={require("../../static/partners/logo-hetic-horizontal.png")}/>
				<img src={require("../../static/partners/logo-hetic-horizontal.png")}/>
			</div>
		</MaxWidth>
	</div>
	<div class="home-4">
		<MaxWidth>
		<h2>DERNIERS <span class="color-orange">ARTICLES</span></h2>
		<div class="min_home-4">
			<div>
				<div><img src={require("../../static/min/patrick.png")}/></div>
				<h3 class="title_home-4">TÉMOIGNAGE</h3>
				<p>Découvrez l’histoire de Patrick, sans abris depuis 10 ans.</p>
			</div>
			<div>
				<div>
					<div><img src={require("../../static/min/article1.png")}/></div>
					<h3 class="title_home-4">ARTICLES</h3>
					<p>Je suis un titre d’article.</p>
				</div>
				<div>
					<div>
						<div><img src={require("../../static/min/article2.png")}/></div>
						<h3 class="title_home-4">ARTICLES</h3>
						<p>Je suis un titre d’article.</p>
					</div>
					<div>
						<div class="interarticle_home-4">
							<h3>DÉCOUVREZ<br />
							<span class="min_span_home-4">DE NOUVEAUX</span><br />
							<span>ARTICLES</span></h3>
							<div class="cta_home-4">EN SAVOIR PLUS</div>				
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
