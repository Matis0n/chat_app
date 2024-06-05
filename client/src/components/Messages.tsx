import styles from '../styles/Messages.module.css'
import {FC} from "react";
import {StateTypeFromServer} from "../types/types.ts";


interface IProps {
    messages: Array<StateTypeFromServer>
    name: string;
}

const Messages: FC<IProps> = ({messages, name}) => {
    return (
        <div className={(styles.messages)}>
            {messages.map(({user,message}, index) => {
                const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase()
                const className = itsMe ? styles.me : styles.user
                return (
                    <div key={index} className={`${styles.message} ${className}`}>
                        <span className={styles.user}>{user.name}</span>
                        {
                            user.name === "Admin"
                            ? <div className={styles.text}>{user.message}</div>
                            : <div className={styles.text}>{message}</div>
                        }
                    </div>
                )
            })}
        </div>
    );
}

export default Messages