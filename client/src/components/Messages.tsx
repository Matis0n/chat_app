import styles from '../styles/Messages.module.css'
import {FC} from "react";
import {UserTypeFromServer} from "../types/types.ts";


type TypeProps = {
    messages:Array<UserTypeFromServer>
    name: string;
}

const Messages:FC<TypeProps>=({messages, name})=> {
    return (
        <div className={(styles.messages)}>
            {messages.map(({user}, index) => {
                const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase()
                const className = itsMe ? styles.me : styles.user
                return (
                    <div key={index} className={`${styles.message} ${className}`}>
                        <span className={styles.user}>{user.name}</span>
                        <div className={styles.text}>{user.message}</div>
                    </div>
                )
            })}
        </div>
    );
}

export default Messages