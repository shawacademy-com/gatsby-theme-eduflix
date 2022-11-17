const {PageGenerator} = require('./page-generator');
const {HomePage} = require('./page-providers');
const {CourseInfoPage} = require('./page-providers');
const {CategoryPage} = require('./page-providers');

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions;
  const pageGenerator = new PageGenerator(graphql, createPage);

  const homePage = new HomePage(graphql);
  const homePageConfiguration = await homePage.pages();
  await pageGenerator.generate(homePageConfiguration);

  const learnerCourseInfoPage = new CourseInfoPage(graphql);
  const learnerCourseInfoPageConfiguration =
    await learnerCourseInfoPage.pages();
  await pageGenerator.generate(learnerCourseInfoPageConfiguration);

  const categoryPage = new CategoryPage(graphql);
  const categoryPageConfiguration = await categoryPage.pages();
  await pageGenerator.generate(categoryPageConfiguration);
};
