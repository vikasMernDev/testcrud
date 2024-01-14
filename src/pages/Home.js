import React, { useEffect, useState } from 'react'
import { Button, Table } from '@mantine/core';
import axios from 'axios'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Add from './Add';

function Home() {

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/comments`)
        .then((res) => res.data),
  })
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!isPending && !error && data) {
      // Set the default value once the data is successfully fetched
      setList(data.slice(0,5))
    }
  }, [isPending, error, data]);

  if (isPending) return 'Loading...';
  if (isFetching) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        // Make an API request to delete the item with the specified id
        const res = await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
        if (res) {
          alert(' Deleted successfully')
        }
        // Update the local state to remove the deleted item
        setList((prevList) => prevList.filter((element) => element.id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const rows = list.length > 0 && list.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Link to={`/private/update/${element.id}`}>
        <Button style={{ marginRight: '10px' }}>Edit</Button>
      </Link>
      <Button onClick={() => handleDelete(element.id)}>Delete</Button>
    </Table.Tr>
  ));

  return (
    <div>
      <Add setList={setList}/>
      <div>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  )
}

export default Home