// Component Props Types
export interface BaseProps {
  disabled?: boolean
}

export type ButtonType = 'primary' | 'secondary' | 'default'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends BaseProps {
  type?: ButtonType
  size?: ButtonSize
}

export type InputType = 'text' | 'password' | 'email'

export interface InputProps extends BaseProps {
  modelValue?: string
  placeholder?: string
  type?: InputType
}
export interface ImageProps {
  src?: string
  alt?: string
  data?: any[] | any;
  isNeedMetaPanel?: boolean;
  initialIndex?: number;
}