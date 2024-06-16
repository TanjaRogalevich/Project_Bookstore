import React from 'react'
import './index.scss'

interface ContainerProps {
  children: React.ReactNode;
}

function Container ({ children }: ContainerProps) {
  return <div className="container">{children}</div>
}

export default Container
