import styles from '../styles/Main.module.css'
import {Link} from "react-router-dom";
import {FieldsType} from "../types/types.ts";
import {ChangeEvent, useState} from "react";


function Main() {

    const [values, setValues] = useState<FieldsType>({name: "", room: ""})

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target
        setValues({...values, [name]: value})
    }

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        const isDisable = Object.values(values).some(values => !values)
        if (isDisable){
            event.preventDefault()
        }
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Присоединение</h1>
                <form className={styles.form}>
                    <div className={styles.group}>
                        <input
                            type="text"
                            placeholder="Введите имя"
                            name="name"
                            value={values.name}
                            className={styles.input}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input
                            type="text"
                            placeholder="Введите название комнаты"
                            name="room"
                            value={values.room}
                            className={styles.input}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <Link to={`/chat?name=${values.name}&room=${values.room}`}>
                            <button onClick={()=>handleClick} type="submit" className={styles.button}>Войти</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Main
