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
            <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, </p>

        </div>
    </div>
</div>
);

export default Guide;