import { ContainerProps } from '../../types/interface'
import './index.scss'

export function Container ({ children }: ContainerProps) {
  return <div className="container">{children}</div>
}
