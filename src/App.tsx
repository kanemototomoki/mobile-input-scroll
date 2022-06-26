import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

const observer = new IntersectionObserver(
  (e) => {
    console.log(e);
  },
  {
    root: window.document.documentElement,
    rootMargin: '0px',
    threshold: 1.0,
  }
);

function App() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isShowOriginalInput, setIsShowOriginalInput] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const originalInput = useRef<HTMLInputElement>(null);
  const dummyInput = useRef<HTMLInputElement>(null);
  const [vh, setVh] = useState<number>(window.visualViewport.height);

  useEffect(() => {
    if (dummyInput.current) {
      console.warn('kansi');
      observer.observe(dummyInput.current);
    }
  }, [dummyInput.current]);

  useEffect(() => {
    if (isFocus) {
      console.log(vh);
      setVh(window.visualViewport.height);
    }
  }, [window.visualViewport.height]);

  return (
    <div className='App'>
      <div
        className='video'
        style={{
          height: '100vh',
          backgroundColor: 'pink',
        }}
      ></div>
      <input
        type='text'
        name='input-original'
        ref={originalInput}
        tabIndex={-1}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fontSize: '24px',
          ...(isShowOriginalInput
            ? {
                // visibility: 'hidden'
                opacity: 0,
                zIndex: -1,
              }
            : {}),
        }}
        onChange={(e) => setInputText(e.target.value)}
        onBlur={() => setIsFocus(false)}
      />
      <button
        style={{
          position: 'absolute',
          top: '25%',
          left: 0,
        }}
        onClick={() => setIsShowOriginalInput((s) => !s)}
      >
        切り替え
      </button>
      <input
        type='text'
        name='input-dummy'
        ref={dummyInput}
        onFocus={() => {
          originalInput.current?.focus();
          setIsFocus(true);
        }}
        style={{
          height: '10vh',
          width: '90%',
          fontSize: '24px',
          // ...(isFocus
          //   ? {
          //       position: 'fixed',
          //       left: 0,
          //       top: vh + 'px',
          //     }
          //   : {}),
        }}
        value={inputText}
      />
    </div>
  );
}

export default App;
