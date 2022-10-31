import React from 'react';
import {Router} from '@reach/router';
import WatchLesson from './WatchLesson';

const WebinarRouter:React.FC = () => {
  return (
    <Router basepath='/'>
      <WatchLesson path='/watch/:id' />
    </Router>
  );
};

export default WebinarRouter;
