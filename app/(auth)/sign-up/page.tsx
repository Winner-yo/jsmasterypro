'use client'

import AuthForm from '@/components/forms/AuthForm'
import React from 'react'
import { signUpSchema } from '@/lib/validations'

const SignUp = () => {
  return (
     <AuthForm formType="sign-up" schema={signUpSchema}
        defaultValues={{
            email: '',
            password: '',
            username: '',
            name: '', 
          }}
        onSubmit={(data) => Promise.resolve({success: true, data})}
        />
  )
}

export default SignUp