import classnames from 'classnames';
import MaxWidth from '../MaxWidth';

import './index.css';

const About = () => (
	<div>
		<div className="about__top">
			<div className="img__top">
				<img src={require('../../static/team/team__picture.png')} />
			</div>
			<div className="text__top">
				<p>
					Pour faire bouger les choses <br />
					<span className="block-orange">il faut une équipe engagée</span>
				</p>
			</div>
		</div>

		<div className="about__main__info">
			<MaxWidth>
				<div className="about__title">
					<h2>
						Une <span className="color-orange">Association</span>
					</h2>
					<p>
						Ma-Road est une association loi 1901 à but non lucratif.<span className="color-orange">Son objectif</span>{' '}
						est de venir en aide aux personnes <span className="color-orange">sans-abris</span> en mettant
						en relation des <span className="color-orange">étudiants de différentes écoles</span> pour
						l’organisation de maraudes. Ma-Road part d’un constat simple : le contact humain est très
						important.
					</p>
				</div>

				<div className="about__data__info">
					<div className="data__info">
						<span className="color-orange">96</span>
						<p>Événements organisés</p>
					</div>
					<div className="data__info">
						<span className="color-orange">+300</span>
						<p>Étudiants participants</p>
					</div>
					<div className="data__info">
						<span className="color-orange">21</span>
						<p>Écoles partenaires</p>
					</div>
				</div>

				<div className="about__title">
					<h2>
						Une équipe <span className="color-orange">réunie</span>
					</h2>
					<p>
						Notre équipe est totalement impliquée dans ce projet qui nous tient à coeur, au niveau éthique
						et professionnelle.
					</p>
				</div>

				<div className="about__team__arbo">
					<div className="team__market">
						<div className="team__portrait">
							<img src={require('../../static/team/ingal.png')} className="person__img" />
							<p className="Team__name">Ingal PRUDENTE</p>
							<span className="color-orange">CEO</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/mathieu.png')} className="person__img" />
							<p className="Team__name">Mathieu PARISOT</p>
							<span className="color-orange">Responsable Marketing</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/erwan.png')} className="person__img" />
							<p className="Team__name">Erwas PRIMAS</p>
							<span className="color-orange">Chargé de marketing</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/louis.png')} className="person__img" />
							<p className="Team__name">Louis-Charles PETIT</p>
							<span className="color-orange">Chargé de marketing</span>
						</div>
					</div>

					<div className="team__produit">
						<div className="team__portrait">
							<img src={require('../../static/team/noemie.png')} className="person__img" />
							<p className="Team__name">Noémie PONCET</p>
							<span className="color-orange">Responsable Produit</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/fanny.png')} className="person__img" />
							<p className="Team__name">Fanny RAVASSARD</p>
							<span className="color-orange">Chargé de produit</span>
						</div>

						<div className="team__portrait">
							<img src={require('../../static/team/wlad.png')} className="person__img" />
							<p className="Team__name">Wladimir PIELA MELINCU</p>
							<span className="color-orange">Chargé de produit</span>
						</div>
					</div>

					<div className="team__design">
						<div className="team__portrait">
							<img src={require('../../static/team/thomas-w.png')} className="person__img" />
							<p className="Team__name">Thomas WANTZ</p>
							<span className="color-orange">Responsable Design</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/gregoire.png')} className="person__img" />
							<p className="Team__name">Grégoire POINTIER</p>
							<span className="color-orange">Designer</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/jessica.png')} className="person__img" />
							<p className="Team__name">Jessica POULAIN</p>
							<span className="color-orange">Designer</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/raphael.png')} className="person__img" />
							<p className="Team__name">Raphael PERALTA</p>
							<span className="color-orange">Designer</span>
						</div>
					</div>

					<div className="team_dev">
						<div className="team__portrait">
							<img src={require('../../static/team/kerian.png')} className="person__img" />
							<p className="Team__name">Kérian PELAT</p>
							<span className="color-orange">Responsable technique</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/thomas-p.png')} className="person__img" />
							<p className="Team__name">Thomas POIRIER</p>
							<span className="color-orange">Développeur</span>
						</div>
						<div className="team__portrait">
							<img src={require('../../static/team/martin.png')} className="person__img" />
							<p className="Team__name">Martin PRÉJEAN</p>
							<span className="color-orange">Developpeur</span>
						</div>
					</div>
				</div>
			</MaxWidth>

			<div className="about__goals">
				<div className="about__title">
					<h2>
						Par une même <span className="color-orange">volonté</span>
					</h2>
				</div>

				<div className="about__goals__info">
					<div className="goals__info__card">
						<h3>
							Créer des <br />
							<span className="color-orange">liens sociaux</span>
						</h3>
						<p>
							Le premier objectif de Ma-Road est de tisser des liens entre les étudiants et les
							sans-abris, de créer des relations pérennes entre ces deux mondes, si différent mais
							complémentaire. Cela fondera un rapport de confiance qui permettra de développer Ma-Road !
						</p>
					</div>
					<div className="goals__info__card">
						<h3>
							Réchauffer <br />
							<span className="color-orange">des coeurs</span>
						</h3>
						<p>
							Un des objectif de Ma-Road est d’apporter du réconfort aux personnes les plus démunis,
							discuter avec les sans-abris, leur apporter des choses pouvant leur faire plaisir ou leur
							servir (Café, nourriture chaude, couverture, cadeaux de Noël,...)
						</p>
					</div>
					<div className="goals__info__card">
						<h3>
							Faire vivre une <br />
							<span className="color-orange">expérience unique</span>
						</h3>
						<p>
							Participer à une maraude est une expérience hors du temps, que vous ne regretterez pas. Cela
							va révéler le meilleur en vous et vous permettre d’aider votre prochain.{' '}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div className="about__join">
			<div className="img__bottom">
				<img src={require('../../static/about-join.png')} />
			</div>
			<div className="text__bottom">
				<h2>Rejoignez le mouvement</h2>
				<p>
					L’association Ma-Road recrute ! Nous avons besoin de personnes bénévoles et engagés pour réaliser
					nos différentes missions, que ce soit en amont des maraudes (logistique, gestion des stocks,...) ou
					directement sur place pour encadrer les étudiants
				</p>
				<button className="join__button">DEVENEZ AMBASSADEUR</button>
			</div>
		</div>
	</div>
);

export default About;
