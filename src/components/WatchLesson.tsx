import React from 'react';
import {RouteComponentProps} from '@reach/router';
import ReactPlayer from 'react-player/lazy';
import * as styles from '../styles/components/WatchLesson.module.scss';

interface Props extends RouteComponentProps {
  path: any,
}

const WatchLesson:React.FC<Props> = () => {
  return (
    <div className={styles.watchLessonContainer}>
      <ReactPlayer
        url={`https://player.vimeo.com/video/627492478`}
        width="100vw"
        height="100vh"
        playing={true}
        volume={0.5}
        light={true}
        // onProgress={onProgressHandler}
        progressInterval={5000}
        controls={true}
        // onDuration={onDurationHandler}
        // className={styles.reactPlayer}
        // onStart={() => triggerLessonClickedEvent(eventParams)}
        // onPlay={videoPlayHandler}
        // onPause={videoPauseHandler}
        // onEnded={videoEndHandler}
      />
    </div>
  );
};

export default WatchLesson;
