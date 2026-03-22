'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { Send, AlertCircle, RotateCcw, LogOut, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const formatMessage = (content: string) => {
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return (
      <span key={index}>
        {part.split('\\n').map((line, i) => (
          <span key={i}>
            {line}
            {i !== part.split('\\n').length - 1 && <br />}
          </span>
        ))}
      </span>
    );
  });
};

export default function Chatbot() {
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading, error, setInput, reload, append } = useChat({
    api: '/api/chat',
    initialMessages: [],
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSuggestionClick = (suggestion: string) => {
    append({ role: 'user', content: suggestion });
  };

  const suggestions = [
    "My Fiddle Leaf Fig is dropping healthy leaves.",
    "Can you help me diagnose yellowing Monstera leaves?",
    "What is the best soil mix for a Japanese Maple Bonsai?",
    "How do I prevent root rot in indoor succulents?"
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="Botanist Logo" width={40} height={40} className={styles.logoImage} />
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>Master Kenji</h1>
          <p className={styles.headerSubtitle}>Master Botanist & Plant Care Expert</p>
        </div>
        <div className={styles.headerActions}>
          {messages.length > 0 && (
            <button 
              onClick={() => setMessages([])} 
              className={styles.newChatBtn} 
              aria-label="New chat"
              title="Start a new conversation"
            >
              <Plus size={16} />
              <span>New Chat</span>
            </button>
          )}
          <Link href="/login" className={styles.logoutBtn} aria-label="Log out" title="Log out of your account">
            <LogOut size={16} />
            <span>Log out</span>
          </Link>
        </div>
      </header>

      <main className={styles.chatWindow}>
        {messages.length === 0 && !error ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateAvatar}>
              <Image src="/logo.png" alt="Botanist Avatar" width={80} height={80} />
            </div>
            <h2 className={styles.emptyStateTitle}>Welcome to the nursery.</h2>
            <p className={styles.emptyStateText}>
              Cultivating healthy plants and peaceful spaces through decades of botanical wisdom.
            </p>
            <div className={styles.suggestionGrid}>
              {suggestions.map((suggestion, idx) => (
                <button 
                  key={idx} 
                  className={styles.suggestionCard}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  aria-label={`Ask: ${suggestion}`}
                >
                  <span className={styles.suggestionIcon}>🌱</span> 
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(m => (
            <div key={m.id} className={`${styles.messageWrapper} ${m.role === 'user' ? styles.messageUser : styles.messageBot}`}>
              {m.role === 'assistant' && (
                <div className={styles.botAvatarSmall}>
                  <Image src="/logo.png" alt="Kenji" width={32} height={32} />
                </div>
              )}
              <div className={styles.messageBubble}>
                {formatMessage(m.content)}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.messageBot}`}>
            <div className={styles.botAvatarSmall}>
              <Image src="/logo.png" alt="Kenji" width={32} height={32} />
            </div>
            <div className={styles.messageBubble}>
              <div className={styles.loadingIndicator}>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
              <AlertCircle size={18} /> Connection Error
            </div>
            <p style={{ marginBottom: '1rem', opacity: 0.9 }}>{error.message || "Failed to reach the server. Please check your network connection."}</p>
            <button 
              onClick={() => reload()} 
              style={{ background: '#991b1b', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.4rem', border: 'none', cursor: 'pointer', width: 'fit-content' }}
            >
              <RotateCcw size={14} /> Retry Query
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <div className={styles.inputArea}>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <textarea
            className={styles.textarea}
            value={input}
            placeholder="Describe your plant's condition..."
            onChange={handleInputChange}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
            rows={1}
          />
          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <Send size={16} strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
}
