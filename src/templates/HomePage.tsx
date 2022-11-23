import {graphql} from 'gatsby';
import React from 'react';
import Footer from './Shared/Footer';
import Header from './Shared/Header';
import {browseCourseCollection} from './Shared/HomePageProvider';
import * as styles from '../styles/templates/HomePage.module.scss';
import FeaturedCourse from '../components/FeaturedCourse';
import CourseList from '../components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CourseCollection} from '../types/course.type';
import {v4 as uuidv4} from 'uuid';

interface Props {
  data: any;
}

const HomePage:React.FC<Props> = ({data}) => {
  const courseCollection = browseCourseCollection();
  const allCourseCollection =
    courseCollection?.brandEducationBrandcourses.coursecollections;
  const footerData = data.brandWebsiteFooter;

  return (
    <div>
      <Header />
      <FeaturedCourse />
      <div className={styles.contentContainer}>
        {allCourseCollection.map((item: CourseCollection) => {
          return (
            <CourseList
              key={uuidv4()}
              data={item}
            />
          );
        })}
      </div>
      <Footer footerData={footerData} />
    </div>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query HomePage($locale: String) {
      brandWebsiteFooter(locale: {eq: $locale}) {
        locale
        navigation {
          section {
            title
            links {
            ... on BrandWebsite_coursepages {
              coursepageurl: url
              coursemenuname
            }
            ... on BrandWebsite_facultypage {
              facultypageurl: url
              title
            }
            ... on BrandWebsite_staticwebpage {
              id
              title
              staticpageurl: url
            }
            ... on BrandWebsite_bloghomepage {
              id
              blogpageurl: url
              title
            }
            ... on BrandWebsite_reviewspage {
              id
              reviewspageurl: url
              title
            }
            ... on BrandWebsite_externallink {
              externalurl: url
              title
            }
          }
        }
      }
      bottomnavigation {
        ... on BrandWebsite_staticwebpage {
          url
          title
        }
        ... on BrandWebsite_externallink {
          externallink:url
          title
        }
      }
      single_line
      subtagline
      tagline
    }
  }`;
