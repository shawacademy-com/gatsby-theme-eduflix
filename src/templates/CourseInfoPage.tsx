import {graphql} from 'gatsby';
import React from 'react';
import CourseInfoView from '../components/CourseInfoView';
import Header from './Shared/Header';

interface Props {
  data: any,
}

const CourseInfoPage:React.FC<Props> = ({data}) => {
  const courseData = data.brandEducationCourse;

  return (
    <div>
      <Header />
      <CourseInfoView courseData={courseData} />
    </div>
  );
};

export default CourseInfoPage;

export const pageQuery = graphql`
  query CourseInfoPageID($id: String) {
    brandEducationCourse(id: { eq: $id }) {
      id
      locale
      courseslug
      coursedescription
      coursename
      tags
      faculty
      modules {
        modulename
        lessons {
          id
          lessonname
          lessondescription
          lessonvideo {
            uri
          }
        }
      }
    }
  }
`;
