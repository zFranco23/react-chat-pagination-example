
import { FC, useCallback, useEffect, useState } from "react"
import { getMessages } from "../../helpers";
import Message from "../Message/Message";

type Props = {}

import style from './style.module.css';

const ChatContainer: FC<Props> = (props) => {

  const [page,setPage] = useState<number>(0); 
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [messages,setMessages]= useState<Array<any>>([]) 


  const fetchMessages = useCallback(async ()=>{
    setIsLoading(true)
    const data = await getMessages(page);
    console.log(data);
    
    setMessages(ps => [...data,...ps])
    setIsLoading(false);
  },[page])

  useEffect(()=>{
    fetchMessages();
  },[fetchMessages])


  return (
    <div className={style.chatContainer} id="scrollArea">
        {isLoading && <div>...loading </div>}
        
        <div className={style.messagesList}>
            {messages.map((m, idx: number)=> (
                <Message key={`message-${idx}`} message={m} />
            ))}
        </div>

    </div>
  )
}

export default ChatContainer