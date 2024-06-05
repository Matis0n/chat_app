import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {useLocation, useNavigate} from "react-router-dom";
import {StateTypeFromServer, FieldsType} from "../types/types.ts";

import styles from '../styles/Chat.module.css'
import emoji from '../assets/img/emoji.svg'
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages.tsx";


let socket = io('http://localhost:5000');

type searchParamsType = Record<string, string>

function Chat() {

    const {search} = useLocation()
    const navigate = useNavigate();
    const [state, setState] = useState<StateTypeFromServer[]>([])
    const [params, setParams] = useState<FieldsType | searchParamsType>({name:'',room:''});
    const [message, setMessage] = useState<string>('')
    const [isOpen, setOpen] = useState<boolean>(false)
    const [usersCount, setUsersCount] = useState<number>(0)

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

    useEffect(() => {
        socket.on('room', ({data:{users}}) => {
            setUsersCount(users.length)
        })
    }, []);

    console.log(state)
    const leftRoom = () => {
        socket.emit('leftRoom',{params})
        navigate('/')
    }
    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>setMessage(event.target.value)
    const onEmojiClick = ({emoji}:{emoji:string}) => setMessage(`${message} ${emoji}`)
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!message) return
        socket.emit('sendMessage', {message,params})
        setMessage('')
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>Комната: {params.room}</div>
                <div className={styles.users}>{usersCount} человек(а) в комнате</div>
                <button className={styles.left} onClick={leftRoom}>Выйти из комнаты</button>
            </div>
            <div className={styles.messages}>
               <Messages messages={state} name={params.name}></Messages>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                    <input type="submit" value="Отправить"/>
                </div>
            </form>
        </div>
    )
}

export default Chat
