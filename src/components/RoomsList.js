import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Room from './Room';

const RoomsList = (props) => {
  const context = useContext(RoomContext);
  const { rooms, sortedRooms } = context;
  if (props.rooms === undefined || props.rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no roooms matched your search parameters</h3>
      </div>
    );
  }

  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {sortedRooms.map((item) => (
          <Room key={item.id} room={item} />
        ))}
      </div>
    </section>
  );
};

export default RoomsList;
