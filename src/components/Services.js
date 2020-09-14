import React, { useState } from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([
    {
      icon: <FaCocktail />,
      title: 'free cocktails',
      info:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, consequatur.',
    },
    {
      icon: <FaHiking />,
      title: 'endless hiking',
      info:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, consequatur.',
    },
    {
      icon: <FaShuttleVan />,
      title: 'free shuttle',
      info:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, consequatur.',
    },
    {
      icon: <FaBeer />,
      title: 'strongest beer',
      info:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, consequatur.',
    },
  ]);
  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map((item, index) => (
          <article key={index} className="service">
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
