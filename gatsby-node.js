const {PageGenerator} = require('./page-generator');
const {HomePage} = require('./page-providers');
const {BrowseCollectionPage} = require('./page-providers');
const {CourseInfoPage} = require('./page-providers');

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions;
  const pageGenerator = new PageGenerator(graphql, createPage);

  const homePage = new HomePage(graphql);
  const homePageConfiguration = await homePage.pages();
  await pageGenerator.generate(homePageConfiguration);

  const browsePage = new BrowseCollectionPage(graphql);
  const browsePageConfiguration = await browsePage.pages();
  await pageGenerator.generate(browsePageConfiguration);

  const learnerCourseInfoPage = new CourseInfoPage(graphql);
  const learnerCourseInfoPageConfiguration =
    await learnerCourseInfoPage.pages();
  await pageGenerator.generate(learnerCourseInfoPageConfiguration);
};
