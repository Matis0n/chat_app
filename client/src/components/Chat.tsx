import {useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {useLocation} from "react-router-dom";


let socket = io('http://localhost:5000');

type searchParamsType = Record<string, string>


function Chat() {
    let {search} = useLocation()
    const [params, setParams] = useState<searchParamsType | null>(null);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    console.log(params)
    return (
        <>
            Chat
        </>
    )
}

export default Chat
