import React, { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './api';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', description: '', price: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newItem.id || !newItem.name || !newItem.description || newItem.price <= 0) {
      setErrorMessage('Todos os campos são obrigatórios e o preço deve ser maior que zero.');
      return;
    }

    if (isEditing) {
      await updateItem(newItem.id, newItem);
    } else {
      await createItem(newItem);
    }

    fetchItems();
    setNewItem({ id: '', name: '', description: '', price: 0 });
    setIsEditing(false);
  };

  const handleEdit = (item) => {
    setNewItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='container'>
      <h1>Items</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form className='form' onSubmit={handleCreateOrUpdate}>
        <input
          placeholder="ID"
          value={newItem.id}
          onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
          required
        />
        <input
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
          required
        />
        <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description} - ${item.price}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
