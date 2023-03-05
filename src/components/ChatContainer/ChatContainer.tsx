
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { getMessages } from "../../helpers";
import Message from "../Message/Message";

type Props = {}

import style from './style.module.css';

const ChatContainer: FC<Props> = (props) => {

  const messageListRef = useRef<HTMLDivElement | null>(null)
  const hiddenDivRef = useRef<HTMLDivElement | null>(null)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [showObserver,setShowObserver] = useState<boolean>(true);
  const [page,setPage] = useState<number>(0); 
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [messages,setMessages]= useState<Array<any>>([]) 


  const fetchMessages = useCallback(async ()=>{
    console.log(page);
    setShowObserver(false);
    setIsLoading(true)
    const data = await getMessages(page);    
    if(messageListRef.current){
        console.log( messageListRef.current.firstChild);
        ;
        const elem = messageListRef.current;
        console.log(messageListRef.current.offsetTop);
        
        elem.scrollTop = 100
    }
    setShowObserver(true);
    setMessages(ps => [...data,...ps])
    setIsLoading(false);
  },[page])

  useEffect(()=>{
    fetchMessages();
  },[fetchMessages])


  useEffect(()=>{
    if(messages.length && page === 0){
        const elem = messageListRef.current;

        if(elem){
            elem.scrollTop = elem.scrollHeight
        }
    }
  },[messages, page])



  const observerCallback = useCallback((observerEntries: any) => {
    if (observerEntries[0].isIntersecting) {
        if(!isLoading){
            setPage( ps => ps + 1)
        }
      }
  },[isLoading])

  useEffect(()=>{
    let observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });
    
        if(hiddenDivRef.current){
            observer.observe(hiddenDivRef.current)
        }
    
    
        return () => {
            if(hiddenDivRef.current){
                observer.unobserve(hiddenDivRef.current);
            }
        }
  },[observerCallback])

  return (
    <div className={style.chatContainer} id="scrollArea">

        
        <div className={style.messagesList} ref={messageListRef}>
        {isLoading && <div>...loading </div>}
            {showObserver && <div ref={hiddenDivRef}></div>}
            {messages.map((m, idx: number)=> (
                <Message key={`message-${idx}`} message={m} />
            ))}
        </div>

    </div>
  )
}

export default ChatContainer