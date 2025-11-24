'use client'

import React, { useState, useEffect } from 'react'

interface TypingEffectProps {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting typing
  loop?: boolean;
}

export function TypingEffect({ text, speed = 100, delay = 0, loop = false }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        startTyping()
      }, delay)
      return () => clearTimeout(delayTimeout)
    } else {
      startTyping()
    }
  }, [text, speed, delay, loop])

  const startTyping = () => {
    setIsTypingComplete(false)
    setDisplayedText('')
    setCurrentIndex(0)
  }

  useEffect(() => {
    if (!isTypingComplete && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && !isTypingComplete) {
      setIsTypingComplete(true)
      if (loop) {
        // Optional: Add a pause before looping
        setTimeout(() => {
          startTyping()
        }, 2000) // Pause for 2 seconds before restarting
      }
    }
  }, [currentIndex, text, speed, isTypingComplete, loop])

  return (
    <>
      {displayedText}
      <span className={`inline-block w-[0.5em] h-full bg-accent-primary align-bottom animate-blink ${isTypingComplete && !loop ? 'opacity-0' : ''}`}></span>
    </>
  )
}
