import {navigate} from 'gatsby';
import React, {Key} from 'react';
import * as styles from '../styles/components/Cards.module.scss';
import {ExploreMore} from '../utils/icons';
import Cards from './Cards';

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
        {data.courses.map((item: any, index: Key) => {
          return (
            <Cards key={index} courseData={item} />
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;
