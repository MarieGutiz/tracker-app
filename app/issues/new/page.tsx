'use client';
import { Button, TextField } from '@radix-ui/themes';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface NewIssueForm {
  title: string;
  description: string;
} 

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<NewIssueForm>();

  return (
    <form className='max-w-xl space-y-3'
     onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
     })}>  
        <TextField.Root placeholder="Title" {...register('title')}>
     </TextField.Root>
     <Controller 
      name='description'
      control={control}
      render={({field}) => (
        <SimpleMDE placeholder='Add a description here...' {...field}/>
      )}
     />

<Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage