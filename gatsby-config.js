const activeEnv =
 process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default
    starter. This barebones starter ships with the main Gatsby configuration
    files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentstack`,
      options: {
        api_key: process.env.BrandWebsiteApiKey,
        delivery_token: process.env.BrandWebsiteDeliveryToken,
        cdn: process.env.BrandWebsiteCdn,
        environment: process.env.ApplicationEnv,
        expediteBuild: true,
        enableSchemaGeneration: true,
        type_prefix: 'BrandWebsite', // (default)
      },
    },
    {
      resolve: `gatsby-source-contentstack`,
      options: {
        api_key: process.env.BrandEducationApiKey,
        delivery_token: process.env.BrandEducationDeliveryToken,
        cdn: process.env.BrandEducationCdn,
        environment: process.env.ApplicationEnv,
        expediteBuild: false,
        enableSchemaGeneration: false,
        type_prefix: 'BrandEducation', // (default)
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: '@robinmetral/gatsby-source-s3',
      options: {
        aws: {
          accessKeyId: process.env.AssetsBucketAccessKeyId,
          secretAccessKey: process.env.AssetsBucketAccessSecret,
        },
        buckets: [process.env.AssetsBucketName],
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: [
          `/watch/*`,
        ],
      },
    },
  ],
};
