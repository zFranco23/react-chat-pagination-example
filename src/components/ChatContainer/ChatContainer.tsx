
import { FC, useCallback, useEffect, useState } from "react"
import { getMessages } from "../../helpers";

type Props = {}

import style from './style.module.css';

const ChatContainer: FC<Props> = (props) => {

  const [page,setPage] = useState<number>(0); 
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [messages,setMessages]= useState<Array<any>>([]) 


  const fetchMessages = useCallback(async ()=>{
    setIsLoading(true)
    const data = await getMessages(page);
    setIsLoading(false);
  },[page])

  useEffect(()=>{
    fetchMessages();
  },[fetchMessages])

  return (
    <div className={style.chatContainer}>
        {isLoading && <div>...loading </div>}
    </div>
  )
}

export default ChatContainer