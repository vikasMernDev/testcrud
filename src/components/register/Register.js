import React, { useState } from 'react'
import { TextInput, Checkbox, Button, Group, Box, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const [isSuccess, setSuccess] = useState(false);
  const isConsecutive = (value) => {
    for (let i = 0; i < value.length - 1; i++) {
      if (Number(value[i]) + 1 === Number(value[i + 1])) {
        return true;
      }
    }
    return false;
  };

  const schema = z.object({
    firstname: z
      .string()
      .min(6, { message: 'First Name should have at least 6 letters' }),
    lastname: z
      .string()
      .min(6, { message: 'Last Name should have at least 6 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
    mobile: z
      .string()
      .min(10, { message: 'Mobile number should have at least 10 digits' })
      .refine((value) => !isConsecutive(value), {
        message: 'Mobile number should not have consecutive digits.',
      }),
  });

  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
    },

     validate: zodResolver(schema),
  });

  const handleFormSubmit = (values) => {
    console.log(values);
    setSuccess(true);
    form.reset()
    if(values.email){
         localStorage.setItem('email', values.email);
        navigate('/private/login');
    }
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <h1>Register Form</h1>
        <TextInput
          withAsterisk
          label="FirstName"
          placeholder="Enter First Name"
          {...form.getInputProps('firstname')}
        />
        <TextInput
          withAsterisk
          label="LastName"
          placeholder="Enter Last Name"
          {...form.getInputProps('lastname')}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter your Email"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Mobile"
          placeholder="Enter Number"
          {...form.getInputProps('mobile')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      {isSuccess && (
        <Notification
          title="Success"
          color="teal"
          onClose={() => setSuccess(false)}
          shadow="sm"
          position="bottom"
        >
          Form submitted successfully!
        </Notification>
      )}
    </Box>
  );
}

export default Register