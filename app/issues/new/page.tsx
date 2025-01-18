'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';


type NewIssueForm  = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState:{errors} } = useForm<NewIssueForm>(
    { resolver:zodResolver(issueSchema)}
  );
  const [error, setError] = React.useState<string | null>('');

  return (
    <div className='max-w-xl'>
      {error && (<Callout.Root color='red' className='mb-5'>
         <Callout.Text>{error}</Callout.Text>        
        </Callout.Root>)}
      <form className='space-y-3'
     onSubmit={handleSubmit(async (data) => {
        try{await axios.post('/api/issues', data);
        router.push('/issues');}
        catch(err){
          setError('Something went wrong. Please try again.');
          console.error(err)
        }
     })}>  
        <TextField.Root placeholder="Title" {...register('title')}>
     </TextField.Root>

    <ErrorMessage>{errors.title?.message}</ErrorMessage>

     <Controller 
      name='description'
      control={control}
      render={({field}) => (
        <SimpleMDE placeholder='Add a description here...' {...field}/>
      )}
     />
     <ErrorMessage>{errors.description?.message}</ErrorMessage>
<Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage