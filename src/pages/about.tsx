import IndexLayout from "../layouts";
import Wrapper from "../components/Wrapper";
import SiteNav from "../components/header/SiteNav";
import {outer, SiteMain} from "../styles/shared";
import {PostFullHeader, PostFullTitle, NoImage, PostFull} from "../templates/post";
import {PostFullContent} from "../components/PostContent";
import Footer from "../components/Footer";

import Helmet from "react-helmet";
import {css} from "@emotion/core";
import * as React from "react";

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
      <SiteNav />
      <main className="site-main" css={[SiteMain, outer]} id="site-main">
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>About</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                I'm a frontend developer{" "}
                <a href="https://vercel.com/" rel="noopener noreferrer">
                  @Vercel
                </a>{" "}
                working with the React - Redux stack,{" "}
                <a href="https://www.cypress.io/" rel="noopener noreferrer">
                  Cypress.io
                </a>{" "}
                Ambassador. Co-organizer{" "}
                <a href="https://freecodecampba.org/" rel="noopener noreferrer">
                  @freeCodeCampBA
                </a>
                , helping people to get their first IT job, I never stopped learning.
              </p>
              <p>
                If you want to know more about me, check{" "}
                <a href="http://gonzalopozzo.com" rel="noopener noreferrer">
                  this short game
                </a>
                ,{" "}
                <a
                  href="https://drive.google.com/open?id=16Jy5eyFb0NgeiD_TwXEII0sbtIccnEd0aWxkc5vIXWU"
                  rel="noopener noreferrer"
                >
                  download my CV
                </a>
                , or{" "}
                <a href="https://www.linkedin.com/in/gonzalopozzo/" rel="noopener noreferrer">
                  go to Linkedin
                </a>
                .
              </p>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
