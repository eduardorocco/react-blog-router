import style from './Card.module.css'
import placeHolder from '../../assets/placeholder.webp'
import trashCan from '../../assets/cestino-chiuso.png'
import { Link } from 'react-router-dom'

export default function Card({ title = '', content = '', tags = [], image = '', postId, onDelete = () => { } }) {


    const getTagClass = (tag) => {
        switch (tag.toLowerCase()) {
            case 'dolci':
                return style.orange
            case 'torte':
                return style.blue
            case 'ricette vegetariane':
                return style.yellow
            case 'ricette al forno':
                return style.green
            case 'antipasti':
                return style.orange
            case 'primi piatti':
                return style.blue
            case 'dolci veloci':
                return style.yellow
            case 'ricette veloci':
                return style.green
            case 'dolci al cioccolato':
                return style.blue
        }
    };

    return (
        <div className={style.card}>
            <div>
                <img className={style.image} src={image || placeHolder} alt="" />
                <div className={style.contentContainer}>
                    <div className={style.title}>{title}</div>
                    <div className={style.tags}>
                        {tags.map((tag, index) => (
                            <div key={index} className={style.tags}>
                                <div className={getTagClass(tag)}>
                                    {tag}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={style.text}>{content}</div>
                    <div className={style.footerCard}>
                        <Link to={`/our-recipes/${postId}`} className={style.button}>
                            Leggi di più
                        </Link>
                        <div className={style.trash}>
                            <img onClick={onDelete} src={trashCan} alt="" />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}