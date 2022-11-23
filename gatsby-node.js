const {PageGenerator} = require('./page-generator');
const {HomePage} = require('./page-providers');
const {CoursePage} = require('./page-providers');
const {CategoryPage} = require('./page-providers');

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions;
  const pageGenerator = new PageGenerator(graphql, createPage);

  const homePage = new HomePage(graphql);
  const homePageConfiguration = await homePage.pages();
  await pageGenerator.generate(homePageConfiguration);

  const coursePage = new CoursePage(graphql);
  const coursePageConfiguration =
    await coursePage.pages();
  await pageGenerator.generate(coursePageConfiguration);

  const categoryPage = new CategoryPage(graphql);
  const categoryPageConfiguration = await categoryPage.pages();
  await pageGenerator.generate(categoryPageConfiguration);
};
