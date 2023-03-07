import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getMessages } from '../../helpers';
import { usePrevious } from '../../utils';

import { Message as MessageType } from '../../types';

import Message from '../Message/Message';

import style from './style.module.css';

const ChatContainer: FC = (props) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const messageListContentRef = useRef<HTMLDivElement | null>(null);
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [scrollHeight, setScrollHeight] = useState<number | typeof undefined>();
  const prevMessages = usePrevious<MessageType[]>(messages);

  const prevScrollHeight = usePrevious(scrollHeight);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    const data = await getMessages(page);
    if (chatContainerRef.current) {
      setScrollHeight(chatContainerRef.current.scrollHeight);
    }
    setMessages((ps) => [...data, ...ps]);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (messages.length && prevMessages && prevMessages.length > 0) {
      if (
        prevScrollHeight &&
        scrollHeight &&
        prevScrollHeight !== scrollHeight
      ) {
        const elem = chatContainerRef.current;
        if (elem) elem.scrollTop = scrollHeight - prevScrollHeight - 20;
      }
    }
  }, [messages, prevMessages, prevScrollHeight, scrollHeight]);

  useEffect(() => {
    if (messages.length && page === 0) {
      const elem = chatContainerRef.current;
      if (elem) {
        elem.scrollTop = elem.scrollHeight;
      }
    }
  }, [messages, page]);

  const observerCallback = useCallback(
    (observerEntries: IntersectionObserverEntry[]) => {
      if (observerEntries[0].isIntersecting) {
        if (!isLoading) {
          setPage((ps) => ps + 1);
        }
      }
    },
    [isLoading]
  );

  useEffect(() => {
    const nodeRef = hiddenDivRef.current;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (hiddenDivRef.current) {
      observer.observe(hiddenDivRef.current);
    }

    return () => {
      if (nodeRef) {
        observer.unobserve(nodeRef);
      }
    };
  }, [observerCallback]);

  return (
    <div
      id="chatContainer"
      className={style.chatContainer}
      ref={chatContainerRef}
    >
      <div className={style.messagesList} ref={messageListContentRef}>
        {isLoading && <div>...loading </div>}
        <div ref={hiddenDivRef}></div>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          ref={listRef}
        >
          {messages.map((m, idx: number) => (
            <Message key={`message-${idx}`} message={m} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
