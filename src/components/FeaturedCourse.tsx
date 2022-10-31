import React from 'react';
import * as styles from '../styles/components/FeaturedCourse.module.scss';
import {navigate} from 'gatsby';
import Button from './Button';
import {Play, Info} from '../utils/icons';

const FeaturedCourse:React.FC = () => {
  return (
    <div className={styles.featuredCourse}>
      <img
        src={`${process.env.
            AssetsCDN}/course-images/en/graphic-design/website-wide.png`}
        alt="featured course" className={styles.featuredCourse__image} />
      <div className={styles.featuredCourse__details}>
        <div className={styles.courseName}>
          Graphic Design
        </div>
        <div className={styles.courseDescription}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Itaque eos ducimus voluptate laboriosam reiciendis facere
          voluptatibus, cupiditate cumque enim quisquam!
        </div>
        <div className={styles.buttonRow}>
          <Button label='Play' filled Icon={Play} />
          <Button label='More Info' Icon={Info}
            onClick={() => navigate(`/courses/graphic-design/`)} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourse;
