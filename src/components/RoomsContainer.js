import React, { useContext, useEffect } from 'react';
import { RoomContext } from '../context';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import Loading from './Loading';

const RoomsContainer = () => {
  const context = useContext(RoomContext);
  const { loading, sortedRooms, rooms } = context;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
};

export default RoomsContainer;
