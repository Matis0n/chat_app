import {useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {useLocation} from "react-router-dom";
import {FieldsType} from "../types/types.ts";


let socket = io('http://localhost:5000');

type searchParamsType = Record<string, string>


function Chat() {
    const [state, setState] = useState<FieldsType[]>([])

    let {search} = useLocation()
    const [params, setParams] = useState<searchParamsType | null>(null);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({data}) => {
            setState((_state) => ({..._state, data}))
        })
    }, []);

    console.log(state)
    console.log(params)
    return (
        <>
            Chat
        </>
    )
}

export default Chat
