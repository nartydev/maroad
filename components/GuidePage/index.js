import Link from 'next/link';
import classnames from 'classnames';
const { SITE_NAME } = require('../../config');
import MaxWidth from '../MaxWidth';

import './index.css';

const Guide = () => (
<div>
    <div className="guide__top">
        <img src={require("../../static/background_agenda.png")} class="img__top"/>
        <div class="text__top">
            <p>AGIR INDIVIDUELLEMENT C’EST BIEN</p>
            <p><span class="text__top2">MAIS ENSEMBLE C’EST MIEUX</span></p>
        </div>
    </div>
    <div className="little__guide">
        <MaxWidth>
            <h3 className="little__guide-h3">LE PETIT GUIDE DU <span class="color-orange">ROADER</span></h3>
        </MaxWidth>
        <div class="little__guide-block">
            <h3>Bienvenue sur l’espace du roader</h3>
            <p>Salut Roader, tu trouveras ici toutes les informations nécessaires à tes
excursions entre amis, cependant si tu as d’autres questions n’hésite pas à
nous contacter sur les réseaux sociaux.</p>
            <div class="little__guide-evolution">
                <div>
                    <img src={require("../../static/img_guide/guide1.png")} />
                    <div>Prendre conscience</div>
                </div>
                <div>
                    <img src={require("../../static/img_guide/guide2.png")} />
                    <div>Comment changer les mentalités ?</div>
                </div>
                <div>
                    <img src={require("../../static/img_guide/guide3.png")} />
                    <div>Agir et donner de son temps</div>
                </div>
            </div>
        </div>
    </div>
    <div className="change__mentality">
        <MaxWidth>
            <h3 className="little__guide-h3">COMMENT CHANGER <span class="color-orange">LES MENTALITES</span></h3>
        </MaxWidth>
        <div class="content__mentality">
            <img src={require("../../static/feuille.png")} />
            <div class="text">
                <div>
                    <p>"Le monde de la rue et celui des non sdf n’est pas différents."</p>
                    <p>- Philippe 54 ans, sans abris.</p>
                </div>
                <div>
                    <p>Que ces personnes ont toutes une histoire et en sont arrivés là pour une raison."</p>
                    <p>- Hélène 32 ans, bénévole.</p>
                </div>
                <div>
                    <p>"Lors des premières rencontres, il ne faut pas être brusque et  leur proposer un café pour les mettre à l’aise."</p>
                    <p>- Joel 26 ans, bénévole.</p>
                </div>
                <div>
                    <p>"Les sans abris souffrent énormément des regards des passants, même un sourire leur fera passé une bonne journée."</p>
                    <p>- Nico 28 ans, sans abris.</p>
                </div>
                <div>
                    <p>"Et après tout, qui est à l’abris d’une bonne rencontre ? De nombreuses personnes tissent des liens d’amitié avec eux.".</p>
                    <p>- Fatou 45 ans, sans abris.</p>
                </div>
            </div>
        </div>
    </div>
</div>
);

export default Guide;