import React, {Key} from 'react';
import * as styles from '../styles/components/Cards.module.scss';
import Cards from './Cards';

interface Props {
  data: any,
}

const CourseList:React.FC<Props> = ({data}) => {
  console.log('data ', data);

  return (
    <div className={styles.listContainer}>
      <strong className={styles.faculty}>{data.label}</strong>
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
