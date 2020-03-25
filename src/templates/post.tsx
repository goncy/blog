import {graphql, Link} from "gatsby";
import Img from "gatsby-image";
import * as _ from "lodash";
import {setLightness} from "polished";
import * as React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/core";
import {Helmet} from "react-helmet";

import AuthorCard from "../components/AuthorCard";
import Footer from "../components/Footer";
import SiteNav from "../components/header/SiteNav";
import PostCard from "../components/PostCard";
import PostContent from "../components/PostContent";
import PostFullFooter from "../components/PostFullFooter";
import PostFullFooterRight from "../components/PostFullFooterRight";
import ReadNextCard from "../components/ReadNextCard";
import Subscribe from "../components/subscribe/Subscribe";
import Wrapper from "../components/Wrapper";
import IndexLayout from "../layouts";
import {colors} from "../styles/colors";
import {inner, outer, SiteMain} from "../styles/shared";
import config from "../website-config";

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: {
      id: string;
      bio: string;
      avatar: {
        children: Array<{
          fixed: {
            src: string;
          };
        }>;
      };
    };
  };
}

const PostTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  margin: 0 auto;
  padding: 6vw;
  max-width: 1040px;
  text-align: center;

  @media (max-width: 500px) {
    padding: 14vw 3vw 14vw;
  }
`;

const PostFullMeta = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.midgrey};
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 2.5em;

  @media (max-width: 500px) {
    font-size: 1.2rem;
    line-height: 1.3em;
  }
`;

const PostFullMetaDate = styled.time`
  color: ${colors.blue};
`;

const PostFullMetaTags = styled.div`
  margin-top: 0.5em;
`;

export const PostFullTitle = styled.h1`
  margin: 0;
  color: ${setLightness("0.05", colors.darkgrey)};
  @media (max-width: 500px) {
    font-size: 2.9rem;
  }
`;

const PostFullImage = styled.figure`
  margin: 0 -10vw -165px;
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 0 -4vw -100px;
    height: 600px;
    border-radius: 0;
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

const PostFullMetaTag = styled(Link)`
  &:not(:first-child) {
    margin-left: 1em;
  }
`;

const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;

interface PageTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
        tags: string[];
        author: {
          id: string;
          bio: string;
          avatar: {
            children: Array<{
              fixed: {
                src: string;
              };
            }>;
          };
        };
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

const PageTemplate: React.FC<PageTemplateProps> = (props) => {
  const post = props.data.markdownRemark;
  let width = "";
  let height = "";
  if (post.frontmatter.image && post.frontmatter.image.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(", ")[1].split("px")[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.frontmatter.title}</title>

        <meta content={post.excerpt} name="description" />
        <meta content={config.title} property="og:site_name" />
        <meta content="article" property="og:type" />
        <meta content={post.frontmatter.title} property="og:title" />
        <meta content={post.excerpt} property="og:description" />
        <meta content={config.siteUrl + props.pathContext.slug} property="og:url" />
        {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
          <meta content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} property="og:image" />
        )}
        <meta content={post.frontmatter.date} property="article:published_time" />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && <meta content={post.frontmatter.tags[0]} property="article:tag" />}

        {config.facebook && <meta content={config.facebook} property="article:publisher" />}
        {config.facebook && <meta content={config.facebook} property="article:author" />}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={post.frontmatter.title} name="twitter:title" />
        <meta content={post.excerpt} name="twitter:description" />
        <meta content={config.siteUrl + props.pathContext.slug} name="twitter:url" />
        {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
          <meta content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} name="twitter:image" />
        )}
        <meta content="Written by" name="twitter:label1" />
        <meta content={post.frontmatter.author.id} name="twitter:data1" />
        <meta content="Filed under" name="twitter:label2" />
        {post.frontmatter.tags && <meta content={post.frontmatter.tags[0]} name="twitter:data2" />}
        {config.twitter && <meta content={`@${config.twitter.split("https://twitter.com/")[1]}`} name="twitter:site" />}
        {config.twitter && (
          <meta content={`@${config.twitter.split("https://twitter.com/")[1]}`} name="twitter:creator" />
        )}
        {width && <meta content={width} property="og:image:width" />}
        {height && <meta content={height} property="og:image:height" />}
      </Helmet>
      <Wrapper css={PostTemplate}>
        <SiteNav />
        <main className="site-main" css={[SiteMain, outer]} id="site-main">
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !post.frontmatter.image && NoImage]}>
              <PostFullHeader>
                <PostFullTitle>{post.frontmatter.title}</PostFullTitle>
                <PostFullMeta>
                  <PostFullMetaDate dateTime={post.frontmatter.date}>{post.frontmatter.userDate}</PostFullMetaDate>
                  <PostFullMetaTags>
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 &&
                      post.frontmatter.tags.map((tag) => (
                        <PostFullMetaTag to={`/tags/${_.kebabCase(tag)}/`}>{tag}</PostFullMetaTag>
                      ))}
                  </PostFullMetaTags>
                </PostFullMeta>
              </PostFullHeader>

              {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
                <PostFullImage>
                  <Img
                    fluid={post.frontmatter.image.childImageSharp.fluid}
                    imgStyle={{objectFit: "contain"}}
                    placeholderStyle={{objectFit: "cover", opacity: 1}}
                    style={{height: "100%"}}
                  />
                </PostFullImage>
              )}
              <PostContent htmlAst={post.htmlAst} />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}

              <PostFullFooter>
                <AuthorCard author={post.frontmatter.author} />
                <PostFullFooterRight authorId={post.frontmatter.author.id} />
              </PostFullFooter>
            </article>
          </div>
        </main>

        {/* Links to Previous/Next posts */}
        <aside className="read-next" css={outer}>
          <div css={inner}>
            <ReadNextFeed>
              {props.data.relatedPosts && (
                <ReadNextCard relatedPosts={props.data.relatedPosts} tags={post.frontmatter.tags} />
              )}

              {props.pageContext.prev && <PostCard post={props.pageContext.prev} />}
              {props.pageContext.next && <PostCard post={props.pageContext.next} />}
            </ReadNextFeed>
          </div>
        </aside>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: {eq: "meta/img/logo.png"}) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
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
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(filter: {frontmatter: {tags: {in: [$primaryTag]}, draft: {ne: true}}}, limit: 3) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
