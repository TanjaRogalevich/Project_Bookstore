import React from 'react'
import './index.scss'

interface TitleProps {
  children: React.ReactNode;
}

export function Title ({ children }: TitleProps) {
  return (
      <h1 className="title">{children}</h1>
  )
}
