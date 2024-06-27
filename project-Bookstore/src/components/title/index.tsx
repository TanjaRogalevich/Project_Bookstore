import { TitleProps } from '../../types/interface'
import './index.scss'

export function Title ({ children }: TitleProps) {
  return (
      <h1 className="title">{children}</h1>
  )
}
