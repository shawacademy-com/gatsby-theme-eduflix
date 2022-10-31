/**
TODO:
**/
class PageGenerator {
  /**
   TODO:
   @param {string} graphql
   @param {string} createPage
  **/
  constructor(graphql, createPage) {
    this.graphql = graphql;
    this.createPage = createPage;
  }
  /**
   TODO:
   @param {Object} pageConfiguration
  **/
  async generate(pageConfiguration) {
    const pages = pageConfiguration.pageResult;
    const learnerRoute = pageConfiguration.learnerRoute;
    const promises = [];
    if (pageConfiguration.errors) {
      // ERROR
      console.log('Error');
    } else {
      pages.forEach((edge) => {
        let urlPrefix = edge.node.locale;
        if (edge.node.locale === 'en') {
          urlPrefix = '';
        }
        // console.log('Edge: ', edge);
        const pageContext = {
          id: edge.node.id,
          locale: edge.node.locale,
          title: edge.node.title,
          pageslug: edge.node.pageslug,
        };
        if (pageConfiguration.pageType === 'coursepage') {
          pageContext.courseImageS3Key = edge.node.courseImageS3Key;
        }
        if (learnerRoute) {
          urlPrefix = `/learner/` + edge.node.locale;
        }
        if (edge.node.custom) {
          const custom = edge.node.custom;
          Object.keys(custom).forEach(function(key) {
            const keyName = `custom_${key}`;
            const keyValue = custom[key];
            pageContext[keyName] = keyValue;
          });
        }
        const createPagePromise = this.createPage({
          path: urlPrefix + edge.node.url,
          component: pageConfiguration.componentPath,
          context: pageContext,
        });
        promises.push(createPagePromise);
      });
    }
    return promises;
  }
}
module.exports = {
  PageGenerator,
};
