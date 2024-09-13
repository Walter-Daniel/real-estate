import React from 'react'
import { CardWrapper } from './CardWrapper'
import { Social } from './Social'

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel='Bienvenid@s'
      backButtonLabel='No tienes una cuenta?'
      backButtonHref='/auth/register'
      showSocial
    >
      <div>LoginForm</div>
    </CardWrapper>
  )
}
