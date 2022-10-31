/**
 TODO:
**/
class PageProvider {
  /**
   TODO:
   @param {string} graphql
  **/
  constructor(graphql) {
    this.graphql = graphql;
  }

  /**
  * Returns an array of pages
  * @param {string} query
  * @return {Array} The array of pages
  */
  async pages(query) {
    return this.graphql(query);
  }

  /**
   *
   *
   * @param {*} pageResult
   * @return {*}
   * @memberof PageProvider
   */
  generatePageResult(pageResult) {
    const uniquePages = [];
    const newPageResult = [];
    for (let index = 0; index < pageResult.length; index++) {
      const currentPage = pageResult[index];
      if (currentPage.node.locale == currentPage.node.publish_details.locale) {
        newPageResult.push(currentPage);
        uniquePages[currentPage.node.locale + currentPage.node.url] = true;
      }
    }
    return {newPageResult, uniquePages};
  }

  /**
   *
   *
   * @param {*} pageResult
   * @return {*}
   * @memberof PageProvider
   */
  generateBrandCollectionResults(pageResult) {
    const allLocaleContent = pageResult ? pageResult.nodes : [];
    const allBrandCollections = [];
    for (let i = 0; i < allLocaleContent.length; i++) {
      const localeContent = allLocaleContent[i];
      const courseCollections = localeContent.coursecollections;
      if (localeContent.locale == localeContent.publish_details.locale) {
        for (let j = 0; j < courseCollections.length; j++) {
          const collection = courseCollections[j];
          collection.locale = localeContent.locale;
          allBrandCollections.push(collection);
        }
      }
    }
    return allBrandCollections;
  }

  /**
   *
   *
   * @param {*} pageResult
   * @return {*}
   * @memberof PageProvider
   */
  generateBrandCourseResults(pageResult) {
    const allBrandCoures = [];
    const collections = this.generateBrandCollectionResults(pageResult);
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      const courses = collection.courses;
      for (let j = 0; j < courses.length; j++) {
        const currentPage = courses[j];
        currentPage.locale = collection.locale;
        allBrandCoures.push({
          node: currentPage,
        });
      }
    }
    return allBrandCoures;
  }
}

/**
 TODO:
**/
class HomePage extends PageProvider {
  /**
   TODO:
   @param {string} graphql
  **/
  constructor(graphql) {
    super(graphql);
  }
  /**
  * Returns an array of pages
  * @param {string} query
  * @return {Array} The array of pages
  */
  async pages(query) {
    const result = await super.pages(`
  {
    allBrandWebsiteCoursecataloguepage {
      edges {
        node {
          id
          locale
          url
          pageslug
          publish_details {
            locale
          }
        }
      }
    }
    allBrandWebsiteCoursepages {
      nodes {
        courseslug
      }
    }
  }
  `);
    const pages = result.data.allBrandWebsiteCoursecataloguepage;
    const pageResult = pages ? pages.edges : [];
    const newPageResult = [];
    const coursePageQueryData = result.data.allBrandWebsiteCoursepages.nodes;
    const p = require.resolve(`./src/templates/CourseCataloguePage.tsx`);
    for (let index = 0; index < pageResult.length; index++) {
      const s3KeyArray = [];
      const currentPage = pageResult[index];
      if (currentPage.node.locale ==
        currentPage.node.publish_details.locale) {
        coursePageQueryData.forEach((slug) => {
          if (slug) {
            const localizedCourseSlug = `${slug.courseslug}${
              currentPage.node.locale === 'en' ? '' : `-${
                currentPage.node.locale}`}`;
            const courseImageS3Key = `course-images/${
              currentPage.node.locale}/${
              localizedCourseSlug}/website-square.png`;
            s3KeyArray.push(courseImageS3Key);
          }
        },
        );
        currentPage.node.custom = {
          s3KeyArray,
        };
        newPageResult.push(currentPage);
      }
    }
    return {
      'pageResult': newPageResult,
      'errors': result.errors,
      'componentPath': p,
    };
  }
}

/**
 TODO:
**/
class BrowseCollectionPage extends PageProvider {
  /**
   TODO:
   @param {string} graphql
   @param {string} createPage
  **/
  constructor(graphql) {
    super(graphql);
  }

  /**
  * Returns an array of pages
  * @param {string} query
  * @return {Array} The array of pages
  */
  async pages(query) {
    const result = await super.pages(`
    {
      allBrandEducationBrandcourses(
        filter: {brandidentifier: {eq: "${process.env.BrandDomain}"},
        publish_details: {locale: {eq: "en"}}}
      ) {
        nodes {
          locale
          publish_details {
            locale
          }
          coursecollections {
            label
            description
            courses {
              coursename
              courseslug
              locale
            }
          }
        }
      }
    }
`);
    const allLocaleResults = result.data.allBrandEducationBrandcourses;
    const allBrandCollections =
      super.generateBrandCollectionResults(allLocaleResults);
    const pageResult = [];
    for (let index=0; index < allBrandCollections.length; index ++) {
      const collection = allBrandCollections[index];
      const category = collection.label.toLowerCase().
          replace(/[^\w ]+/g, '').
          replace(/ +/g, '-');
      collection.node = {
        locale: collection.locale,
        url: '/' + category + '/',
        custom: {
          collection: JSON.stringify(collection),
        },
      };
      if (!index) {
        const indexCollectionNode = Object.assign({}, collection.node);
        indexCollectionNode.url = '/';
        indexCollectionNode.custom = Object.assign({
          indexRoute: true,
        }, collection.node.custom);
        pageResult.push({
          node: indexCollectionNode,
        });
      }
      pageResult.push(collection);
    }
    const p = require.resolve(`./src/templates/BrowseCollectionPage.tsx`);
    return {
      'pageResult': pageResult,
      'errors': result.errors,
      'componentPath': p,
    };
  }
}

/**
 TODO:
**/
class CourseInfoPage extends PageProvider {
  /**
   TODO:
   @param {string} graphql
   @param {string} createPage
  **/
  constructor(graphql) {
    super(graphql);
  }

  /**
  * Returns an array of pages
  * @param {string} query
  * @return {Array} The array of pages
  */
  async pages(query) {
    const result = await super.pages(`
    {
      allBrandEducationBrandcourses(filter: {
        brandidentifier: {eq: "${process.env.BrandDomain}"},
        publish_details: {locale: {eq: "en"}}}) {
        nodes {
          locale
          publish_details {
            locale
          }
          coursecollections {
             courses {
              id
              courseslug
            }
          }
        }
      }
    }
    `);
    const allLocaleResults = result.data[`allBrandEducationBrandcourses`];
    const allBrandCoures = super.generateBrandCourseResults(allLocaleResults);
    const newPageResult = [];
    for (let index = 0; index < allBrandCoures.length; index++) {
      const course = allBrandCoures[index];
      course.node.url = '/courses/' + course.node.courseslug + '/';
      newPageResult.push(course);
    }
    const p = require.resolve(`./src/templates/CourseInfoPage.tsx`);
    return {
      'pageResult': newPageResult,
      'errors': result.errors,
      'componentPath': p,
    };
  }
}

module.exports = {
  HomePage,
  BrowseCollectionPage,
  CourseInfoPage,
};
