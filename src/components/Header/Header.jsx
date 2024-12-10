import style from './Header.module.css'

export default function Header() {
    return(
        <>
            <header>
                <div className={style.container}>
                    <div className={style.title}>
                        Il mio blog
                    </div>
                </div>
            </header>
        </>
    )
}