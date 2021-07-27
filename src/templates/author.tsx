import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import Wrapper from "../components/Wrapper";
import IndexLayout from "../layouts";
import {inner, outer, PostFeed, PostFeedRaise, SiteMain} from "../styles/shared";
import config from "../website-config";
import AuthorHeader from "../components/header/AuthorHeader";
import SiteNav from "../components/header/SiteNav";

import {PageContext} from "./post";

import Helmet from "react-helmet";
import React from "react";
import {graphql} from "gatsby";

interface AuthorTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    author: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
    authorYaml: {
      id: string;
      website?: string;
      twitter?: string;
      facebook?: string;
      github?: string;
      twitch?: string;
      youtube?: string;
      linkedin?: string;
      location?: string;
      profile_image?: {
        childImageSharp: {
          fluid: any;
        };
      };
      bio?: string;
      avatar: {
        childImageSharp: {
          fluid: any;
        };
      };
    };
  };
}

const Author: React.FC<AuthorTemplateProps> = (props) => {
  const author = props.data.authorYaml;

  const edges = props.data.allMarkdownRemark.edges.filter((edge) => {
    const isDraft = edge.node.frontmatter.draft !== true || process.env.NODE_ENV === "development";
    return isDraft && edge.node.frontmatter.author && edge.node.frontmatter.author.id === author.id;
  });

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.id} - {config.title}
        </title>
        <meta content={author.bio} name="description" />
        <meta content={config.title} property="og:site_name" />
        <meta content="profile" property="og:type" />
        <meta content={`${author.id} - ${config.title}`} property="og:title" />
        <meta content={config.siteUrl + props.pathContext.slug} property="og:url" />
        <meta content={author.website} property="article:publisher" />
        <meta content={author.website} property="article:author" />
        <meta content="summary" name="twitter:card" />
        <meta content={`${author.id} - ${config.title}`} name="twitter:title" />
        <meta content={config.siteUrl + props.pathContext.slug} name="twitter:url" />
        {config.twitter && <meta content={`@${config.twitter.split("https://twitter.com/")[1]}`} name="twitter:site" />}
        {config.twitter && (
          <meta content={`@${config.twitter.split("https://twitter.com/")[1]}`} name="twitter:creator" />
        )}
      </Helmet>
      <Wrapper>
        <SiteNav />
        <AuthorHeader author={author} />
        <main css={[SiteMain, outer]} id="site-main">
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {edges.map(({node}) => {
                return <PostCard key={node.fields.slug} post={node} />;
              })}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Author;

export const pageQuery = graphql`
  query($author: String) {
    authorYaml(id: {eq: $author}) {
      id
      website
      twitter
      bio
      github
      twitch
      youtube
      linkedin
      location
      profile_image {
        childImageSharp {
          fluid(maxWidth: 3720) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {draft: {ne: true}}}
      sort: {fields: [frontmatter___date], order: DESC}
      limit: 2000
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            draft
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 90) {
                      src
                    }
                  }
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
