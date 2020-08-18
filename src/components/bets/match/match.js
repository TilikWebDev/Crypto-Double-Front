import React from 'react';
import s from './match.module.css';
import Preloader from '../../preloader/preloader';

const Match = (props) => {

    if (!props.datetime) {
        return <Preloader/>;
    }

    let datetime = new Date(props.datetime);

    let date = ('0' + datetime.getDate()).slice(-2) + '-' + ('0' + (datetime.getMonth() + 1)).slice(-2); 
    let time = ('0' + datetime.getHours()).slice(-2) + ':' + ('0' + datetime.getMinutes()).slice(-2);


    return (
		<div className={s.match}>
			<div className={s.header}>
				<div className={s.mapcount}>
					BO { props.mapcount }
				</div>

				<div className={s.event}>
					{ props.event }
				</div>

				<span>Фора</span>
				<span>Тотал (Карта 1)</span>
				<span>Результат</span>
			</div>

			<div className={s.body}>
				<div className={s.date}>
					<span>
						{ time }
					</span>

					{ date }
				</div>

				<div className={s.team}>
					<div className={s.row_team}>
						<div className={s.img}>
							<img src={ props.team1_img } alt=""/>
						</div>
						
						<div className={s.name_team}>
							{ props.team1 }
						</div>
					</div>

					<div className={s.row_team}>
                        <div className={s.img}>
                            <img src={ props.team2_img } alt=""/>
                        </div>

                        <div className={s.name_team}>
                            { props.team2 }
                        </div>
					</div>
				</div>

				<div className={s.bookbets}>
					<div className={s.row_bookbets}>
						<span>+1.5</span>
						<span>-1.5</span>
					</div>

					<div className={s.row_bookbets}>
						<button>0</button>
						<button>0</button>
					</div>
				</div>

				<div className={s.bookbets}>
					<div className={s.row_bookbets}>
						<span>Больше 24.5</span>
						<span>Меньше 24.5</span>
					</div>

					<div className={s.row_bookbets}>
						<button>0</button>
						<button>0</button>
					</div>
				</div>

				<div className={s.bookbets}>
					<div className={s.row_bookbets}>
						<span>1</span>
						<span>2</span>
					</div>

					<div className={s.row_bookbets}>
						<button>{ props.koef_1 }</button>
						<button>{ props.koef_3 }</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Match;