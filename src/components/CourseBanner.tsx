import React from 'react';
import * as styles from '../styles/components/CourseInfoHeroBanner.module.scss';
import {navigate} from 'gatsby';

interface Props {
  courseData: any,
}

const CourseBanner:React.FC<Props> = ({courseData}) => {
  console.log('course data ', courseData);

  const navigateToWatchLessonPage = () => {
    navigate(`/watch/${courseData.modules[0].lessons[0].id}`);
  };

  return (
    <div className={styles.heroBanner_container}>
      <img src={`${process.env.AssetsCDN}/course-images/en/${
        courseData.courseslug}/website-wide.png`} />
      <div className={styles.heroBanner_info}>
        <h3>{courseData.coursename}</h3>
        <button className={styles.featuredCourse__play}
          onClick={navigateToWatchLessonPage}>
          {/* <PlayArrowIcon /> */}
          <span>Play 1st Lesson</span>
        </button>
      </div>
    </div>
  );
};

export default CourseBanner;
