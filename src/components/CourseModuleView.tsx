import React, {Key, useMemo, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import * as styles from '../styles/components/CourseModuleView.module.scss';
import htmr from 'htmr';
import {navigate} from 'gatsby';

interface Props {
  moduleData: any,
}

const CourseModuleView:React.FC<Props> = ({moduleData}) => {
  const newModuleData = useMemo(() => {
    return moduleData.map((module: any, moduleIndex: any) => {
      return {...module, modulenumber: `Module ${moduleIndex + 1}`};
    });
  }, [moduleData]);

  const [currentModule, setCurrentModule] =
    useState(newModuleData[0].modulenumber);
  console.log('current module ', currentModule);
  console.log('module data ', newModuleData);

  const moduleFilteredLessons = useMemo(() => {
    return newModuleData.filter((module: any) => {
      return module.modulenumber === currentModule;
    });
  }, [newModuleData, currentModule]);
  console.log('module filtered courses ', moduleFilteredLessons);

  return (
    <div className={styles.courseModuleViewContainer}>
      <div className={styles.moduleViewHeader}>
        <h3>Course Lessons</h3>
        <Dropdown className={styles.moduleFilterContainer}>
          <Dropdown.Toggle
            title={currentModule}
            className={styles.moduleFilterDefaultItem}>
            {currentModule}
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.moduleFilterDropdown}>
            {newModuleData.map((module: any, index: Key) => (
              <Dropdown.Item key={index}
                onClick={() => setCurrentModule(module.modulenumber)}
                className={styles.moduleFilterDropdownItem}
                onSelect={() => null}>
                <p>{module.modulenumber}</p>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {moduleFilteredLessons.map((item: any, index: Key) => (
        <div key={index} className={styles.moduleLessonContent}>
          <h3>{item.modulename}</h3>
          {item.lessons.map((lesson: any, lessonIndex: any) => (
            <div key={lessonIndex} className={styles.lessonRow}>
              <span className={styles.lessonNumber}>{lessonIndex + 1}</span>
              <div className={styles.lessonVideo}
                onClick={() => navigate(`/watch/${lesson.id}`)}></div>
              <div className={styles.lessonInfo}>
                <h4>{lesson.lessonname}</h4>
                <span>{htmr(lesson.lessondescription)}</span>
              </div>
              <span className={styles.lessonDuration}>30m</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CourseModuleView;
