import React from 'react';
import * as styles from '../styles/components/CourseInfoView.module.scss';
import CourseBanner from './CourseBanner';
import htmr from 'htmr';
import CourseModuleView from './CourseModuleView';

interface Props {
  courseData: any,
}

const CourseInfoView:React.FC<Props> = ({courseData}) => {
  return (
    <div className={styles.courseInfoPage}>
      <CourseBanner courseData={courseData} />
      <section className={styles.courseInfoSection}>
        <div className={styles.courseDescription}>
          {htmr(courseData.coursedescription)}
        </div>
        <CourseModuleView moduleData={courseData.modules} />
      </section>
    </div>
  );
};

export default CourseInfoView;
