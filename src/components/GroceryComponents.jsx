import React, { useRef, useState } from 'react';
import { v4 as uuid } from "uuid";
import GroceryItemComponents from './GroceryItemComponents';

const GroceryComponents = () => {
  const inputRef = useRef();
  const [item, setItem] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [errors, setErrors] = useState("");

  // handle Add item
  const handleAddItem = () => {

    if(item){
      setGroceryItems([...groceryItems, { id: uuid(), name: item }]);
      setItem("");
      setErrors("");
    }else{
      setErrors("Field cannot be empty!");
      inputRef.current.focus();
    }
  }

  // To Edit an item
  const handleEditItem = (id, newItem) => {
    const updateGroceryItems = groceryItems.map((item) => {
      if (item.id === id) {
        return { ...item, name: newItem };
      }
      return item;
    });
    setGroceryItems(updateGroceryItems);
  };

  // To Delete an Item
  const handleDeleteItem = (removeId) => {
    const filteredItems = groceryItems.filter((item) => item.id !== removeId);
    setGroceryItems(filteredItems);
  };

  // To clear textfield after hit the add item
  const handdleClearItem = () =>{
    setGroceryItems([]);
  };


  return (
  <div className='grocery-buddy'>
    <h1>Grocery Buddy</h1>
    <div className="input-section">
      <div className="input-container">
        <input ref={inputRef} type="text" placeholder="Enter Item" value={item}
          onChange={(event) => setItem(event.target.value)} />
        <button onClick={handleAddItem} className='btn-add' >Add Item</button>
      </div>
      <div>{errors ? <p className='errors'>{errors}</p> : null}</div>
      </div>
      <ul className="grocery-list">
        {groceryItems.map((item) => 
          <GroceryItemComponents 
          key={item.id} 
          item={item} 
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
         />)}
      </ul>
    {groceryItems.length > 0 ? (
        <button onClick={handdleClearItem} className='btn-clear'>
          Clear Grocery Items{""}
        </button>)
    : null}
  
  </div>
  );
};


export default GroceryComponents;