import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

interface UpdateProps {}

interface FormData {
  name: string;
  email: string;
}

const Update: React.FC<UpdateProps> = () => {
  const navigate = useNavigate();
  const [isSuccess, setSuccess] = useState<boolean | undefined>();

  const schema = z.object({
    name: z
      .string()
      .min(6, { message: 'First Name should have at least 6 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
  });

  const form = useForm<FormData>({
    initialValues: {
      name: '',
      email: '',
    },
    validate: zodResolver(schema) as any,
  });

  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData', id],
    queryFn: async () =>
      await axios
        .get(`https://jsonplaceholder.typicode.com/comments/${id}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      form.setValues({
        name: data?.name || '',
        email: data?.email || '',
      });
    }
  }, [isLoading, error, data, id]);

  if (isLoading) return <div>Loading...</div>;


  const handleFormSubmit = (values: FormData) => {
    form.reset();
    if (values.email) {
      setSuccess(true);
    }
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <h1>Update User</h1>
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
          Updated successfully!
        </Notification>
      )}
    </Box>
  );
};

export default Update;
