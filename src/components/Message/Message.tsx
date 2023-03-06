
import type { FC } from 'react'
import type { Message as MessageType } from '../../types'

import style from './style.module.css';

type Props = {
    message: MessageType,
    idx: number
}


const Message: FC<Props> = (props) => {
    const currId = '123' // 'I'm the trasmitter
    const {message} = props;

    const self = message.id === currId;
    
    let mssgElem;

    if(self){
        mssgElem =  <div id={message.uid.toString()} className={`${style.mssgContainer} ${style.rightContainer}`}>
            {/* <p>{message.message}</p> */}
            <p>Message {message.uid}</p>
        </div>
    }else {
        mssgElem = <div id={message.uid.toString()} className={`${style.mssgContainer} ${style.leftContainer}`}>
            <p>Message {message.uid}</p>
        </div>
    }

    return mssgElem;
}

export default Message