import React, {useMemo, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import * as styles from '../styles/components/CourseModuleView.module.scss';
import htmr from 'htmr';
import {navigate} from 'gatsby';
import {Lesson, Module} from '../types/course.type';
import {v4 as uuidv4} from 'uuid';

interface Props {
  moduleData: any;
}

const CourseModuleView:React.FC<Props> = ({moduleData}) => {
  const newModuleData = useMemo(() => {
    return moduleData.map((module: Module, moduleIndex: number) => {
      return {...module, modulenumber: `Module ${moduleIndex + 1}`};
    });
  }, [moduleData]);

  const [currentModule, setCurrentModule] =
    useState(newModuleData[0].modulenumber);

  const moduleFilteredLessons = useMemo(() => {
    return newModuleData.filter((module: Module) => {
      return module.modulenumber === currentModule;
    });
  }, [newModuleData, currentModule]);

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
            {newModuleData.map((module: Module) => (
              <Dropdown.Item key={uuidv4()}
                onClick={() => setCurrentModule(module.modulenumber)}
                className={styles.moduleFilterDropdownItem}
                onSelect={() => null}>
                <p>{module.modulenumber}</p>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {moduleFilteredLessons.map((item: Module) => (
        <div key={uuidv4()} className={styles.moduleLessonContent}>
          <h3>{item.modulename}</h3>
          {item.lessons.map((lesson: Lesson, lessonIndex: number) => (
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
