import React, { useEffect, useState } from 'react';
import { TextInput, Button, Group, Box, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { Comment } from './Home';

interface AddProps {
  setList:  React.Dispatch<React.SetStateAction<Comment[]>>;
}


function Add({ setList }: AddProps) {
  const [isSuccess, setSuccess] = useState<boolean | undefined>();

  const schema = z.object({
    name: z.string().min(5, { message: 'Name should have at least 5 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
  });

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
    },
    validate: zodResolver(schema),
  });

  const handleFormSubmit = (values: { name: string; email: string }) => {
    setList((prevList) => [
      ...prevList,
      {
        id: prevList.length + 1, 
        name: values.name,
        email: values.email,
      } as Comment,
    ]);
  
    form.reset();
    if (values.email) {
      setSuccess(true);
    }
  };
  

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess]);

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <h1>Add User</h1>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter your Email"
          {...form.getInputProps('email')}
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
        >
          Added successfully!
        </Notification>
      )}
    </Box>
  );
}

export default Add;
