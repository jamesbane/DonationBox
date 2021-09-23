import React, {useEffect} from 'react';
import lottie from 'lottie-web';
import loadingJson from './data';
import cn from 'classnames';

import style from './Loader.module.scss';

export default function Loader(props) {
    const {isVisible} = props;
    const id = 'loading-container';

    useEffect(() => {
        let animation = lottie.loadAnimation({
            container: document.getElementById(id),
            animationData: loadingJson,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            name: 'animation',
        });

        setTimeout(() => {
            animation.play()
        }, 350);

        return () => {
            lottie.destroy('animation');
        }
    }, []);

    return (
        <div className={cn(style.container, {
            [style.containerVisible]: isVisible
        })}>
            <div className={style.bg}>
                <div id={id} className={style.loader}/>
            </div>
        </div>
    )
}