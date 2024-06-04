import {ChangeEvent, useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {useLocation} from "react-router-dom";
import {UserTypeFromServer, FieldsType} from "../types/types.ts";

import styles from '../styles/Chat.module.css'
import emoji from '../assets/img/emoji.svg'
import EmojiPicker from "emoji-picker-react";

let socket = io('http://localhost:5000');

type searchParamsType = Record<string, string>

function Chat() {
    const [state, setState] = useState<UserTypeFromServer[]>([])
    const [params, setParams] = useState<FieldsType | searchParamsType>({room: '', user: ''});
    const [message, setMessage] = useState<string>('')
    const [isOpen, setOpen] = useState<boolean>(false)
    let {search} = useLocation()
    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({data}) => {
            setState((_state) => ([..._state, data]))
        })
    }, []);
    console.log('state', state)
    console.log('params', params)

    const leftRoom = () => {}
    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>setMessage(event.target.value)
    const onEmojiClick = ({emoji}:{emoji:string}) => setMessage(`${message} ${emoji}`)
    const handleSubmit = ()=>{}
    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>Комната: {params.room}</div>
                <div className={styles.users}>{} 0 человек в комнате</div>
                <button className={styles.left} onClick={leftRoom}>Выйти из комнаты</button>
            </div>
            <div className={styles.messages}>
                {state.map(({user},index) => <div key={index}>{user.message}</div>)}
            </div>
            <form className={styles.form}>
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Напишите сообщение..."
                        name="message"
                        value={message}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className={styles.emoji}>
                    <img src={emoji} alt="emoji" onClick={()=>setOpen(!isOpen)}/>
                    {isOpen && (
                        <div className={styles.emojies}>
                            <EmojiPicker  onEmojiClick={onEmojiClick}/>
                        </div>
                    )}
                </div>
                <div className={styles.button}>
                    <input type="submit" onSubmit={handleSubmit} value="Отправить"/>
                </div>
            </form>
        </div>
    )
}

export default Chat
