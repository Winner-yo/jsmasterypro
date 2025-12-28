"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'

import { AskQuestionSchema } from '@/lib/validations';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from '../ui/input';

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });
  const handleCreateQuestion = () => {}
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel
                className="paragraph-semibold 
                text-dark400_light800 
                "
              >
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular 
                  background-light700_dark300 light_border-2 
                  text-dark300_light700 no-focus min-h-14 
                  border"
                  {...field}
                />
              </FormControl>
              <FormDescription
                className="body-regular mt-2.5 
              text-light-500"
              >
                Be specific and imagine you&apos;re asking a question to a fellow
                developer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel
                className="paragraph-semibold 
                text-dark400_light800 
                "
              >
                Detail explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>Editor</FormControl>
              <FormDescription
                className="body-regular mt-2.5 
              text-light-500"
              >
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel
                className="paragraph-semibold 
                text-dark400_light800 
                "
              >
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                <Input
                  className="paragraph-regular 
                  background-light700_dark300 light_border-2 
                  text-dark300_light700 no-focus min-h-14 
                  border"
                  placeholder='Add Tags...'
                  {...field}
                  />
                  Tags
                </div>
              </FormControl>
              <FormDescription
                className="body-regular mt-2.5 
              text-light-500"
              >Add up to 5 tags to describe what your question is about.
                You need to press enter enter to add each tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-16 flex justify-end'>
          <Button
          className='primary-gradient w-fit text-light-900!'>Ask A Question</Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;