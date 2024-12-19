// Common type definitions
export type ButtonType = 'primary' | 'secondary' | 'default'
export type ButtonSize = 'small' | 'medium' | 'large'
export type InputType = 'text' | 'password' | 'email'

export interface BaseProps {
  disabled?: boolean
}

export interface ButtonProps extends BaseProps {
  type?: ButtonType
  size?: ButtonSize
}

export interface InputProps extends BaseProps {
  modelValue?: string
  placeholder?: string
  type?: InputType
}

export interface ImageProps {
  src: string
  alt?: string
}