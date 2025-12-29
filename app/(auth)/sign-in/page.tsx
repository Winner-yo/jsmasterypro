'use client'
import React from 'react'

import AuthForm from '@/components/forms/AuthForm'
import { signInSchema } from '@/lib/validations'

const SignIn = () => {
  return (
        <AuthForm formType="sign-in" schema={signInSchema}
        defaultValues={{
            email: '',
            password: '',
        }}
        onSubmit={(data: any) => Promise.resolve({success: true, data})}
        />
  );
}

export default SignIn