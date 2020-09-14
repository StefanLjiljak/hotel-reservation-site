import React, { useState, useEffect } from 'react';
// import items from './data';
import client from './Contentful';

export const RoomContext = React.createContext();

export const RoomProvider = (props) => {
  const [state, setState] = useState({
    rooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  const [sortedRooms, setSortedRooms] = useState([]);

  // getting the data from Contentful
  const getData = async () => {
    try {
      let res = await client.getEntries({
        content_type: 'hotel',
        order: '-fields.price',
      });
      let rooms = formatData(res.items);
      let featuredRooms = rooms.filter((room) => room.featured);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let minPrice = Math.min(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));
      let minSize = Math.min(...rooms.map((item) => item.size));

      setState({
        ...state,
        rooms,
        featuredRooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        minPrice,
        maxSize,
        minSize,
      });
      setSortedRooms(rooms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;

      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = (slug) => {
    let tempRooms = [...state.rooms];
    const room = tempRooms.find((_room) => _room.slug === slug);
    return room;
  };

  const filterRooms = () => {
    let {
      rooms,
      type,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
      capacity,
    } = state;
    // all the rooms
    let tempRooms = [...rooms];
    // transform values
    capacity = +capacity;
    price = +price;

    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast);
    }
    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets);
    }

    //change state
    setSortedRooms(tempRooms);
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    filterRooms();
  }, [state]);

  return (
    <RoomContext.Provider
      value={{
        ...state,
        sortedRooms: sortedRooms,
        getRoom: getRoom,
        handleChange: handleChange,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export const RoomConsumer = RoomContext.Consumer;
