import './Categories.scss'
import computer from '../../assets/cat/computer.png'
import engg from '../../assets/cat/engg.png'
import tech from '../../assets/cat/tech.png'
import accounting from '../../assets/cat/accounting.png'
import film from '../../assets/cat/film.png'
import music from '../../assets/cat/music.png'

const Categories = () => {

    const catgories = [
        { img: engg, title: "Engineering" },
        { img: tech, title: "Technology" },
        { img: computer, title: "ComputerScience" },
        { img: accounting, title: "Accounting" },
        { img: film, title: "Filming" },
        { img: music, title: "Music" },
    ]

    return (
        <div className='categories'>
            {catgories.map((cat) => (
                <div className="cat" key={cat.title}>
                    <img className='caticon' src={cat.img} alt={cat.title} />
                    <span>{cat.title}</span>
                </div>
            ))}
        </div>
    )
}

export default Categories