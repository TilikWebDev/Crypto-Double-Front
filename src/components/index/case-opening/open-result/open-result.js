import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './open-result.module.css';

const OpenResult = (props) => {

    let style = {
        main: {
            display: (props.opening_status === 'open-result') ? 'flex' : 'none'
        }, 

        animate_background: {
            color: '#c7cdce',
            opacity: 0.3
        }
    } 

    let price = parseInt(props.win_drop_data.price);

    switch (true) {
        case (price > 50000):
            style.animate_background = {
                color: '#ed462f',
                opacity: 0.8
            }
            break;

        case (price > 20000):
            style.animate_background = {
                color: '#b63e67',
                opacity: 0.8
            }
            break;

        case (price > 10000):
            style.animate_background = {
                color: '#ff8c29',
                opacity: 0.8
            }
            break;
        
        case (price > 1000):
            style.animate_background = {
                color: '#ebc42f',
                opacity: 0.8
            }
            break;

        case (price > 500):
            style.animate_background = {
                color: '#1f62d5',
                opacity: 0.8
            }
            break;

        case (price > 250):
            style.animate_background.color = '#3894bd';
            break;

        case (price > 100):
            style.animate_background.color = '#75a79a';
            break;

        default:
            break;
    }
    
    return (
        <div className={s.drop} style={style.main}>
            <div className={s.image} style={{borderColor: props.color_case}}>
                <NavLink to={`/case/${props.prev_case}`} className={[s.prev_case, s.disabled].join(' ')}>
                    <i className={'fa fa-angle-double-left'} aria-hidden={'true'}></i>
                </NavLink>

                <div className={s.animation}>
                    <div className={s.relative}>
                        <div className={s.animation_image}>
                            <svg width="101" height="101" viewBox="0 0 101 101" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M100.013 50.0132C100.013 56.7927 98.6638 63.257 96.2191 69.1524L50.0131 50.0132H100.013ZM50.0131 50.0132L3.80622 69.1505C6.34038 75.2623 10.0518 80.7626 14.6577 85.3685L50.0131 50.0132ZM50.0131 50.0132H0.0130615C0.0130615 43.2337 1.36234 36.7693 3.807 30.874L50.0131 50.0132ZM50.0131 50.0132L14.6577 14.6578C19.2623 10.0533 24.7607 6.34264 30.8705 3.80854L50.0131 50.0132ZM69.1523 3.80713C63.2569 1.36246 56.7926 0.0131836 50.0131 0.0131836V50.0132L30.8739 96.2193C36.7692 98.6639 43.2336 100.013 50.0131 100.013V50.0132L69.1509 96.2198C75.2626 93.6856 80.7627 89.9743 85.3684 85.3685L50.0131 50.0132L96.2191 30.8739C93.685 24.7629 89.9738 19.2632 85.3684 14.6578L50.0131 50.0132L69.1523 3.80713Z" fill="black" fillOpacity={0.2}/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M96.2071 69.1473C93.6127 75.4107 89.8923 80.8666 85.3777 85.3777L50.0131 50.0131L96.2071 69.1473ZM50.0131 50.0131L3.00869e-06 50.0111C0.0023544 56.6275 1.32642 63.1294 3.81911 69.1473L50.0131 50.0131ZM50.0131 50.0131L3.81911 30.8789C6.41351 24.6155 10.1339 19.1595 14.6485 14.6485L50.0131 50.0131ZM50.0131 50.0131L30.8789 3.81911C36.8951 1.32714 43.395 0.00311756 50.0094 5.72718e-06L50.0131 50.0131ZM85.3777 14.6485C80.8666 10.1339 75.4107 6.41351 69.1473 3.81911L50.0131 50.0131L14.6485 85.3777C19.1595 89.8923 24.6155 93.6127 30.8789 96.2071L50.0131 50.0131L50.0117 100.026C56.6279 100.024 63.1296 98.6997 69.1473 96.2071L50.0131 50.0131L100.026 50.013C100.024 43.3973 98.6995 36.8962 96.2071 30.8789L50.0131 50.0131L85.3777 14.6485Z" fill={style.animate_background.color} fillOpacity={style.animate_background.opacity}/>
                            </svg>
                        </div>
                    </div>
                </div>

                <img alt={props.win_drop_data.name} src={require(`../../../../img/drop/${decodeURI(props.win_drop_data.image)}`)}/>

                <NavLink to={`/case/${props.next_case}`} className={[s.next_case, s.disabled].join(' ')}>
                    <i className={'fa fa-angle-double-right'} aria-hidden={'true'}></i>
                </NavLink>
            </div>

            <div className={s.name} style={{background: props.color_case}}>
                {props.win_drop_data.name}
            </div>

            <div className={s.footer}>
                <button className={s.button} onClick={() => props.changeOpeningStatus('case-zoom')}>Продолжить</button>

                {
                    props.sell_drop_button_status && 
                    <button className={[s.button, s.sell].join(' ')} onClick={() => props.sellDrop(props.win_drop_data._id, props.win_drop_data.price)}>Продать за {props.win_drop_data.price} грн</button>
                }
            </div>
        </div>
    );
}

export default OpenResult;