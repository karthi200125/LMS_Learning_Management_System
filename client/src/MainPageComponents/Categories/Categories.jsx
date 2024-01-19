// Categories.jsx
import React, { useState } from 'react';
import './Categories.scss';
import computer from '../../assets/cat/computer.png';
import engg from '../../assets/cat/engg.png';
import tech from '../../assets/cat/tech.png';
import accounting from '../../assets/cat/accounting.png';
import film from '../../assets/cat/film.png';
import music from '../../assets/cat/music.png';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 1, img: engg, title: "engineering" },
        { id: 2, img: tech, title: "technology" },
        { id: 3, img: computer, title: "computerscience" },
        { id: 4, img: accounting, title: "accounting" },
        { id: 5, img: film, title: "film" },
        { id: 6, img: music, title: "music" },
    ];

    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (category) => {
        navigate('/', { state: category });
        setActiveCategory(category);
    };

    return (
        <div className='categories'>
            {categories.map((cat) => (
                <div
                    className={`cat ${activeCategory === cat.title && 'active'}`}
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.title)}
                >
                    <img className='caticon' src={cat.img} alt={cat.title} />
                    <span>{cat.title}</span>
                </div>
            ))}
        </div>
    );
};

export default Categories;
