import Link from 'next/link';
import classnames from 'classnames';
const { SITE_NAME } = require('../../config');
import MaxWidth from '../MaxWidth';

import './index.css';

const Guide = () => (
<div>
    <div className="guide__top">
        <div className="img__top">
            <img src={require("../../static/maroad_2.png")} className="logo_home-1"/>
        </div>
        <div className="text__top">
            <p>Agir individuellement c'est bien</p>
            <br></br>
            <p>Mais ensemble c'est mieux</p>
        </div>
    </div>

    <div className="guide__main__info">
    <MaxWidth>
        <div className="guide__title">
            <h2>Le petit guide du <span className="color-orange">Roader</span></h2>
        </div>
        <div className="guide__block__info">
            <h3>Bienvenue sur l'espace du roader</h3>
            <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</p>
            <div className="guide__icon__info">
                <div className="icon__info">
                    <img src={require("../../static/maroad_2.png")} class="logo_home-1"/>
                    <h4>Prendre conscience</h4>
                </div>
                <div className="icon__info">
                    <img src={require("../../static/maroad_2.png")} class="logo_home-1"/>
                    <h4>Comment changer les mentalités ?</h4>
                </div> 
                <div className="icon__info">
                    <img src={require("../../static/maroad_2.png")} class="logo_home-1"/>
                    <h4>Agir et donner de son temps</h4>
                </div> 
            </div>
        </div>
    </MaxWidth>
    </div>

    {/* <div class="guide-video">

    </div>

    <div class="guide-quotes">

    </div>

    <div class="guide-guidelines">

    </div> */}
</div>
);

export default Guide;