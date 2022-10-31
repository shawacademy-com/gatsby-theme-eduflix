import React from 'react';
import {graphql} from 'gatsby';
import PropTypes from 'prop-types';
import * as styles from '../styles/templates/HomePage.module.scss';
import {headerData} from './Shared/HomePageProvider';
import Header from './Shared/Header';
import Footer from './Shared/Footer';

interface Props {
  data: any,
}

const HomePage:React.FC<Props> = ({data}) => {
  console.log('data ', data);
  const homePageData = data.brandWebsiteHomepage;
  const footerData = data.brandWebsiteFooter;
  const locale = homePageData.locale;
  const {allBrandWebsiteCoursepages: {nodes: courseData}} = headerData();
  const {allBrandWebsiteFacultypage} = headerData();
  const facultyData = allBrandWebsiteFacultypage.edges;
  const imageData = data.allS3Object;
  console.log('image data ', imageData);

  const filterLocaleBasedData = (data: any) => {
    const filteredData = data.filter((node: any) =>
      node.publish_details.locale === locale);
    return filteredData;
  };

  const getFaculties = (facultyData: any) => {
    const filteredFaculties = facultyData.filter(({node}: any) => {
      return node.publish_details.locale === locale;
    });
    const facultyMap: any = {};
    filteredFaculties.forEach((faculty: any) => {
      facultyMap[faculty.node.facultyslug] = faculty.node;
    });
    return facultyMap;
  };

  const segregateCourses = (courseData: any, facultyData: any) => {
    const facultyMap: any = {};
    Object.keys(facultyData).forEach((faculty) => {
      facultyMap[faculty] = {...facultyData[faculty]};
      facultyMap[faculty].courseList = [];
      courseData.forEach((course: any) => {
        course?.reference.forEach((courseReference: any) => {
          if (courseReference.facultyslug.toLowerCase() === faculty) {
            const data = {
              title: course.title,
              // url: utils.getLocalizedPageLink(locale, course.url),
              menuName: course.coursemenuname,
              rating: course.rating,
              graduates: course.graduates,
              slug: course.courseslug,
            };
            facultyMap[faculty].courseList.push(data);
          }
        });
      });
    });
    return Object.keys(facultyMap)
        .map((ele) => (facultyMap[ele]));
  };

  const facultyMap = getFaculties(facultyData);
  const filteredCourseData = filterLocaleBasedData(courseData);
  const facultyList = segregateCourses(filteredCourseData, facultyMap);

  console.log('faculty list ', facultyList);

  return (
    <div>
      <Header />
      <div className={styles.landingPage}>
        {facultyList.map((faculty, index) =>
        faculty.courseList.length ? (
          <div className={styles.courseContainer}>
            <h2>{faculty.title}</h2>
            <div className={styles.courseCardContainer}>
              {faculty.courseList.map((course: any, courseIndex: any) => (
                <div className={styles.courseCard} key={courseIndex}>
                  <p>{course.title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : '')}
      </div>
      <Footer footerData={footerData} />
    </div>
  );
};

HomePage.defaultProps = {
  data: {},
};

HomePage.propTypes = {
  data: PropTypes.object,
};

export default HomePage;

export const pageQuery = graphql`
  query HomePage($id: String, $pageslug: String, $locale: String,
    $custom_s3KeyArray: [String]) {
    brandWebsiteHeader(locale: {eq: $locale}) {
      dropdownheading
      slogan
      texts
      courses {
        url
      }
    }
    brandWebsiteFooter(locale: {eq: $locale}){
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
    brandWebsiteHomepage(id: { eq: $id }) {
      id
      locale
      title
      sections{
        pagesection {
          title
          content
        }
        herosection {
          checkmarkpointone
          checkmarkpointtwo
          existinguser
          heading
          logincta
          signupcta
          subheading
        }
        courselistblock {
          courselist {
            courseslug
            title
            coursemenuname
            coursecarddescription
            coursepreviewvideo {
              title
              href
            }
            url
            seo {
              description
            }
            graduates
            rating
          }
          enrollnowcta
          moreinfocta
          nexttext
          prevtext
          heading
          graduatestext
        }
        reviewslistblock {
          heading
          nexttext
          prevtext
          reviews {
            rating
            review
            reviewerimage {
              href
              title
            }
          }
        }
        testimoniallistblock {
          prevtext
          nexttext
          testimoniallist {
            course
            isimage
            location
            name
            testimonialasset {
              href
              title
            }
            testimonialcontent
          }
        }
        bloglistblock {
          heading
          featuredblogs {
            title
            url
            publisheddate
            category
            featuredimage {
              title
              href
            }
          }
          prevtext
          nexttext
        }
      }
      seo{
        title
        description
        image {
          title
          href
        }
        canonicalurls {
          title
          href
        }
      }
      schema
    }
    canonicalPages:allBrandWebsiteHomepage(
    filter: {pageslug: {eq: $pageslug}}) {
    edges {
      node {
        publish_details{
          locale
        }
        url
      }
    }

  }
  brandWebsiteCoursecataloguepage(locale: {eq: $locale}) {
    url
  }
  allS3Object(filter: {Key: {in: $custom_s3KeyArray}}) {
    nodes {
      Key
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
  }
`;
