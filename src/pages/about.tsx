import * as React from "react";
import {css} from "@emotion/core";
import Helmet from "react-helmet";

import IndexLayout from "../layouts";
import Wrapper from "../components/Wrapper";
import SiteNav from "../components/header/SiteNav";
import {SiteHeader, outer, inner, SiteMain} from "../styles/shared";
import {PostFullHeader, PostFullTitle, NoImage, PostFull} from "../templates/post";
import {PostFullContent} from "../components/PostContent";
import Footer from "../components/Footer";

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main className="site-main" css={[SiteMain, outer]} id="site-main">
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>About</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                I'm a frontend developer working with the React - Redux stack, Cypress.io Ambassador. Co-organizer @
                freeCodeCampBA, helping people to get their first IT job, I never stopped learning.
              </p>
              <p>This is a reduced version of my about page, it's still in progress, check again in a few days!</p>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
