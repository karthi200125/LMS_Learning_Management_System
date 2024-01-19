import { memo, useState } from 'react';
import { IoBookOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Card.scss';

const Card = ({ card, color, bs, border }) => {
    const [boxShadow, setBoxShadow] = useState(null);
    return (
        <Link
            className='card'
            to={`/course/${card._id}`}            
            state={card}
            style={{ color: color, boxShadow, border: border }}
            onMouseEnter={() => setBoxShadow(bs)}
            onMouseLeave={() => setBoxShadow(null)}            
        >
            <img src={card.imageUrl} alt="" loading='lazy' />            
            <div className='content'>
                <h1>{card.title}</h1>
                <p className='carddesc'>{card.description}</p>
                <div className='chapter'>
                    <IoBookOutline size={20} className="book" />
                    <span>{card?.chapters?.length} Chapters</span>
                </div>
                <div className="progress">
                    progress
                </div>
            </div>
        </Link>
    );
}

export default memo(Card);
