
import type { FC } from 'react'
import type { Message as MessageType } from '../../types'

import style from './style.module.css';

type Props = {
    message: MessageType
}


const Message: FC<Props> = (props) => {
    const currId = '123' // 'I'm the trasmitter
    const {message} = props;

    const self = message.id === currId;
    
    let mssgElem;

    if(self){
        mssgElem =  <div className={`${style.mssgContainer} ${style.rightContainer}`}>
            <p>{message.message}</p>
        </div>
    }else {
        mssgElem = <div className={`${style.mssgContainer} ${style.leftContainer}`}>
            <p>{message.message}</p>
        </div>
    }

    return mssgElem;
}

export default Message