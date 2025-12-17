"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; data: T }>;
  formType: 'sign-in' | 'sign-up';
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // Define a submit handler.
  // TODO: Add loading state.
  const handleSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) { 
      form.reset();
    }
  };

  const buttonText = formType === 'sign-in' ? 'Sign In' : 'Sign Up';``

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field: fieldProps }) => (
              <FormItem className="flex flex-col w-full gap-2.5">
                <FormLabel className="paragraph-medium 
                text-dark300_light700 
                ">
                  {field === 'email' ? 'Email Address' : field.charAt(0).toUpperCase() + field.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input 
                  required
                 type={field === 'password' ? 'password' : 'text'} 
                  {...fieldProps} 
                  className="paragraph-regular 
                  background-light900_dark300 light_border-2 
                  text-dark300_light700 no-focus min-h-12 
                  rounded-1.5 border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button disabled={form.isSubmitting} 
        className="primary-gradient min-h-12 w-full
        rounded-2 px-4 py-3 font-inter
        !text-light_900">{form.formState.isSubmitting ? 
        buttonText === 'Sign In' ? 'Signing In...' : 'Signing Up...' : 
        buttonText}</Button>

          {formType === 'sign-in' ? (
            <p>Don't have an account? {' '}
            <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient ">
              Sign Up
            </Link>
            </p>
          ) : ( 
            <p>Already have an account? {' '}
            <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient ">
              Sign In
            </Link>
            </p>
          )}
      </form>
    </Form>
  );
};

export default AuthForm;
