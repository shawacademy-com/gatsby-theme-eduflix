import {navigate} from 'gatsby';
import React from 'react';
import * as styles from '../styles/components/Cards.module.scss';
import {ExploreMore} from '../utils/icons';
import Cards from './Cards';
import {Course} from '../types/course.type';
import {v4 as uuidv4} from 'uuid';

interface Props {
  data: any,
}

const CourseList:React.FC<Props> = ({data}) => {
  const slugifiedLabel = data.label.toLowerCase().
      replace(/[^\w ]/g, '').replace(/ +/g, '-');

  return (
    <div className={styles.listContainer}>
      <div className={styles.facultyNameContainer}
        onClick={() => navigate(`/category/${slugifiedLabel}/`)}>
        <p>{data.label}</p>
        <ExploreMore />
      </div>
      <div className={styles.cardRow}>
        {data.courses.map((item: Course) => {
          return (
            <Cards key={uuidv4()} courseData={item} />
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;
