import {graphql} from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import Footer from "../components/Footer";
import SiteNav from "../components/header/SiteNav";
import PostCard from "../components/PostCard";
import Wrapper from "../components/Wrapper";
import IndexLayout from "../layouts";
import {
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
} from "../styles/shared";
import config from "../website-config";

import {PageContext} from "./post";

interface TagTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    tag: string;
  };
  data: {
    allTagYaml: {
      edges: Array<{
        node: {
          id: string;
          description: string;
          image?: {
            childImageSharp: {
              fluid: any;
            };
          };
        };
      }>;
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const Tags: React.FC<TagTemplateProps> = (props) => {
  const tag = props.pageContext.tag ? props.pageContext.tag : "";
  const {edges, totalCount} = props.data.allMarkdownRemark;
  const tagData = props.data.allTagYaml.edges.find((n) => n.node.id.toLowerCase() === tag.toLowerCase());

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {tag} - {config.title}
        </title>
        <meta content={tagData && tagData.node ? tagData.node.description : ""} name="description" />
        <meta content={config.title} property="og:site_name" />
        <meta content="website" property="og:type" />
        <meta content={`${tag} - ${config.title}`} property="og:title" />
        <meta content={config.siteUrl + props.pathContext.slug} property="og:url" />
        {config.facebook && <meta content={config.facebook} property="article:publisher" />}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={`${tag} - ${config.title}`} name="twitter:title" />
        <meta content={config.siteUrl + props.pathContext.slug} name="twitter:url" />
        {config.twitter && <meta content={`@${config.twitter.split("https://twitter.com/")[1]}`} name="twitter:site" />}
      </Helmet>
      <Wrapper>
        <SiteNav isHome={false} />
        <header
          className={`${tagData && tagData.node.image ? "" : "no-cover"}`}
          css={[outer, SiteHeader]}
          style={{
            backgroundImage:
              tagData && tagData.node.image ? `url('${tagData.node.image.childImageSharp.fluid.src}')` : "",
          }}
        >
          <div css={inner}>
            <SiteHeaderContent>
              <SiteTitle>{tag}</SiteTitle>
              <SiteDescription>
                {tagData && tagData.node.description ? (
                  tagData.node.description
                ) : (
                  <>
                    A collection of {totalCount > 1 && `${totalCount} posts`}
                    {totalCount === 1 && "1 post"}
                    {totalCount === 0 && "No posts"}
                  </>
                )}
              </SiteDescription>
            </SiteHeaderContent>
          </div>
        </header>
        <main css={[SiteMain, outer]} id="site-main">
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {edges.map(({node}) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allTagYaml {
      edges {
        node {
          id
          description
          image {
            childImageSharp {
              fluid(maxWidth: 3720) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}, draft: {ne: true}}}
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            image {
              childImageSharp {
                fluid(maxWidth: 1240) {
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
