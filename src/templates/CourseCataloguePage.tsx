import React from 'react';
import {graphql} from 'gatsby';

interface Props {
  data: any,
}

const CourseCataloguePage:React.FC<Props> = ({data}) => {
  console.log('data ', data);
  return (
    <div>course catalogue page</div>
  );
};

export default CourseCataloguePage;

export const pageQuery = graphql`
  query CourseCatalogueID($id: String, $locale: String, $pageslug: String,
     $custom_s3KeyArray : [String]) {
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
    brandWebsiteCoursecataloguepage(id: { eq: $id }) {
      locale
      title
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
        modularblocks {
        commonsection {
          title
          reference {
            title
            content
            id
          }
        }
        descriptionblock {
          description
        }
      }
    }
    allBrandWebsiteCoursepages (sort: {order: ASC, fields: [menuorder]},
      filter: {
        publish_details: {locale: {eq: $locale}}
      }
    ) {
      nodes {
        url
        title
        graduates
        rating
        courseslug
        coursecarddescription
        coursemenuname
        seo {
          description
        }
        reference {
          facultyslug
        }
        modular_blocks {
          herosection {
            bannerimagealttext
          }
        }
      }
    }
    allBrandWebsiteFacultypage (sort: {order: ASC, fields: [facultyorder]},
      filter: {
        publish_details: {locale: {eq: $locale}}
      }
    ) {
      edges {
        node {
          title
          url
          facultyslug
        }
      }
    }
    canonicalPages:allBrandWebsiteCoursecataloguepage(
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
