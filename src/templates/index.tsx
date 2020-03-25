import {graphql} from "gatsby";
import * as React from "react";
import {css} from "@emotion/core";
import Helmet from "react-helmet";

import Footer from "../components/Footer";
import SiteNav from "../components/header/SiteNav";
import PostCard from "../components/PostCard";
import Wrapper from "../components/Wrapper";
import IndexLayout from "../layouts";
import config from "../website-config";
import Pagination from "../components/Pagination";
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

import {PageContext} from "./post";

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card:nth-of-type(6n + 1):not(.no-image) {
      flex: 1 1 100%;
      flex-direction: row;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      border-radius: 5px 0 0 5px;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-content {
      flex: 0 1 357px;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) h2 {
      font-size: 2.6rem;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) p {
      font-size: 1.8rem;
      line-height: 1.55em;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-content-link {
      padding: 30px 40px 0;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-meta {
      padding: 0 40px 30px;
    }
  }
`;

export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    header: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = (props) => {
  const width = props.data.header.childImageSharp.fluid.sizes.split(", ")[1].split("px")[0];
  const height = String(Number(width) / props.data.header.childImageSharp.fluid.aspectRatio);

  return (
    <IndexLayout css={HomePosts}>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta content={config.description} name="description" />
        <meta content={config.title} property="og:site_name" />
        <meta content="website" property="og:type" />
        <meta content={config.title} property="og:title" />
        <meta content={config.description} property="og:description" />
        <meta content={config.siteUrl} property="og:url" />
        <meta content={`${config.siteUrl}${props.data.header.childImageSharp.fluid.src}`} property="og:image" />
        {config.facebook && <meta content={config.facebook} property="article:publisher" />}
        {config.googleSiteVerification && (
          <meta content={config.googleSiteVerification} name="google-site-verification" />
        )}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={config.title} name="twitter:title" />
        <meta content={config.description} name="twitter:description" />
        <meta content={config.siteUrl} name="twitter:url" />
        <meta content={`${config.siteUrl}${props.data.header.childImageSharp.fluid.src}`} name="twitter:image" />
        {config.twitter && <meta content={`@${config.twitter.split("https://twitter.com/")[1]}`} name="twitter:site" />}
        <meta content={width} property="og:image:width" />
        <meta content={height} property="og:image:height" />
      </Helmet>
      <Wrapper>
        <header
          css={[outer, SiteHeader]}
          style={{
            backgroundImage: `url('${props.data.header.childImageSharp.fluid.src}')`,
          }}
        >
          <div css={inner}>
            <SiteHeaderContent>
              <SiteTitle>
                {props.data.logo ? (
                  <img alt={config.title} src={props.data.logo.childImageSharp.fixed.src} style={{maxHeight: "45px"}} />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
            <SiteNav isHome />
          </div>
        </header>
        <main css={[SiteMain, outer]} id="site-main">
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {props.data.allMarkdownRemark.edges.map((post) => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true || process.env.NODE_ENV !== "production") && (
                    <PostCard key={post.node.fields.slug} post={post.node} />
                  )
                );
              })}
            </div>
          </div>
        </main>
        {props.children}
        <Pagination currentPage={props.pageContext.currentPage} numPages={props.pageContext.numPages} />
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    logo: file(relativePath: {eq: "meta/img/logo.png"}) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: {eq: "meta/img/blog-cover.jpg"}) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {draft: {ne: true}}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
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
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
