import React, { useState } from 'react'
import { TextInput, Button, Group, Box, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [isSuccess, setSuccess] = useState(false);

  const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z
    .string()
    .min(6, { message: 'Password should have at least 6 letters' }),
  });

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

     validate: zodResolver(schema),
  });

  const handleFormSubmit = (values) => {
    const user = localStorage.getItem('email')
    if(values.email === user){
        navigate('/private/home');
    }else{
      setSuccess(true)
    }
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <h1>Login Form</h1>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter your Email"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          type='password'
          label="Password"
          placeholder="Enter Password"
          {...form.getInputProps('password')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      {isSuccess && (
        <Notification
          title="Failed"
          color="teal"
          onClose={() => setSuccess(false)}
          shadow="sm"
          position="bottom"
        >
            Invalid Email
        </Notification>
      )}
      </Box>
        )
}

export default Login