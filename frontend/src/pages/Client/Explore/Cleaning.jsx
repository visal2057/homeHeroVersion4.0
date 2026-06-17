import React from 'react';
import ServiceExplorePage from '../../../components/ServiceExplorePage';

const Cleaning = () => {
  return (
    <ServiceExplorePage
      categoryKey="cleaning"
      pageTitle="Cleaning"
      heroTitle="A cleaner home starts here."
      heroSubtitle="Discover trusted cleaning professionals for deep cleans, regular upkeep, and spotless results."
      bannerImage="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export default Cleaning;
