import {graphql} from 'gatsby';
import React, {Key, useEffect, useRef, useState} from 'react';
import Footer from './Shared/Footer';
import Header from './Shared/Header';
import {browseCourseCollection} from './Shared/HomePageProvider';
import * as styles from '../styles/templates/HomePage.module.scss';
import FeaturedCourse from '../components/FeaturedCourse';
import CourseList from '../components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  data: any,
}

const BrowseCollectionPage:React.FC<Props> = ({data}) => {
  const courseCollection = browseCourseCollection();
  const allCourseCollection =
    courseCollection?.brandEducationBrandcourses.coursecollections;
  console.log('all course collection ', allCourseCollection);
  const footerData = data.brandWebsiteFooter;

  const [isHovered, setIsHovered] = useState(false);
  console.log('isHovered ', isHovered);

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel: any = useRef(null);
  // console.log('max scroll width ', maxScrollWidth);
  // console.log('current index ', currentIndex);
  // console.log('carousel ', carousel);

  const movePrev = () => {
    console.log('move previous');
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    console.log('move next');
    if (carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: any) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  // useEffect(() => {
  //   if (carousel !== null && carousel.current !== null) {
  //     carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
  //   }
  // }, [currentIndex]);

  // useEffect(() => {
  //   maxScrollWidth.current = carousel.current ?
  //     carousel.current.scrollWidth - carousel.current.offsetWidth : 0;
  // }, []);

  return (
    <div>
      <Header />
      <FeaturedCourse />
      <div className={styles.contentContainer}>
        {allCourseCollection.map((item: any, index: Key) => {
          return (
            <CourseList
              key={index}
              data={item}
            />
          );
        })}
      </div>
      <Footer footerData={footerData} />
    </div>
  );
};

export default BrowseCollectionPage;

export const pageQuery = graphql`
  query BrowsePage($locale: String) {
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
