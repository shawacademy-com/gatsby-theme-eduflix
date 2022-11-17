import React, {useMemo} from 'react';
import Cards from '../components/Cards';
import {browseCourseCollection} from './Shared/HomePageProvider';
import {v4 as uuidv4} from 'uuid';
import * as styles from '../styles/templates/CategoryPage.module.scss';

const CategoryPage:React.FC = () => {
  const courseCollection = browseCourseCollection();
  const allCourseCollection =
    courseCollection?.brandEducationBrandcourses.coursecollections;
  const category = window.location.pathname.split('/')[2];
  const filteredCourses = useMemo(() => {
    return allCourseCollection.filter((item: any) => {
      return item.label
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-') === category;
    });
  }, [category]);

  return (
    <div className={styles.categoryPageContainer}>
      {filteredCourses.map((course: any) => (
        <div className={styles.categoryItem} key={uuidv4()}>
          <h3>{course.label}</h3>
          <div className={styles.courseCards}>
            {course.courses.map((data: any) => (
              <Cards key={uuidv4()} courseData={data} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
