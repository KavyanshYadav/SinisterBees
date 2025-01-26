import React from 'react';
import NotionCard from '../ui/HomeCard/Card';

function MainDashBoard() {
  return (
    <div className=" w-full h-full rounded">
      <h1 className="text-xl">Tasks</h1>

      <NotionCard header="name" size="md" />
    </div>
  );
}

export default MainDashBoard;
