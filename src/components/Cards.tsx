import {navigate} from 'gatsby';
import React from 'react';
import * as styles from '../styles/components/Cards.module.scss';
import {Play, Down, Add} from '../utils/icons';
import Button from './Button';

interface Props {
  courseData: any,
}

const Cards:React.FC<Props> = ({courseData}) => {
  console.log('course data ', courseData);

  return (
    <div className={styles.card}>
      <img src={`${process.env.AssetsCDN}/course-images/en/${
        courseData.courseslug}/website-wide.png`}
      className={styles.cardPoster} />
      <div className={styles.cardInfo}>
        <div className={styles.actionRow}>
          <div className={styles.leftSection}>
            <Button Icon={Play} rounded filled />
            <Button Icon={Add} rounded />
          </div>
          <div className={styles.rightSection}>
            <Button Icon={Down} rounded
              onClick={() => navigate(`/courses/${courseData.courseslug}`)} />
          </div>
        </div>
        <div className={styles.textDetails}>
          <strong>{courseData.coursename}</strong>
        </div>
      </div>
    </div>
  );
};

export default Cards;
