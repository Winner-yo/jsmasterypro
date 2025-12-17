'use client'
import AuthForm from '@/components/forms/AuthForm'
import React from 'react'
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