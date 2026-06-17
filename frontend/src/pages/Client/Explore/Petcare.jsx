import React from 'react';
import ServiceExplorePage from '../../../components/ServiceExplorePage';

const Petcare = () => {
  return (
    <ServiceExplorePage
      categoryKey="petcare"
      pageTitle="Petcare"
      heroTitle="Trusted care for your pets."
      heroSubtitle="Book experienced pet sitters, walkers, and home care professionals who treat your animals like family."
      bannerImage="https://images.unsplash.com/photo-1450526859677-cde19c1a020e?auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export default Petcare;
