import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

const FeaturedRooms = () => {
  const value = useContext(RoomContext);
  let { loading, featuredRooms: rooms } = value;
  rooms = rooms.map((room) => <Room key={room.id} room={room} />);

  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
};

export default FeaturedRooms;
