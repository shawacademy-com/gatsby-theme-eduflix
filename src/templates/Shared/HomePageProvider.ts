import {useStaticQuery, graphql} from 'gatsby';

export const browseCourseCollection = () => {
  const data = useStaticQuery(
      graphql`
        query {
          brandEducationBrandcourses(publish_details: {locale: {eq: "en"}},
            brandidentifier: {eq: "upskillist.com"}) {
              coursecollections {
                label
                courses {
                  id
                  coursename
                  courseslug
                  tags
                  faculty
                }
              }
            }
        }
      `,
  );
  return data;
};
