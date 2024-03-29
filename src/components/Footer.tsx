import {colors} from "../styles/colors";
import {outer, inner} from "../styles/shared";
import config from "../website-config";

import {Link} from "gatsby";
import {setLightness} from "polished";
import * as React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/core";

const SiteFooter = css`
  position: relative;
  padding: 20px;
  color: #fff;
  background: ${setLightness("0.0015", colors.darkgrey)};
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  a {
    color: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: "";
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }
  @media (max-width: 650px) {
    a:first-child {
      margin-left: 0;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <footer css={[outer, SiteFooter]}>
      <div css={[inner, SiteFooterContent]}>
        <section className="copyright">
          <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}{" "}
          {config.footer && (
            <Link to="/">
              | {config.title} {config.footer}
            </Link>
          )}
        </section>
        <SiteFooterNav>
          <Link to="/">Latest Posts</Link>
          {config.facebook && (
            <a href={config.facebook} rel="noopener noreferrer" target="_blank">
              Facebook
            </a>
          )}
          {config.twitter && (
            <a href={config.twitter} rel="noopener noreferrer" target="_blank">
              Twitter
            </a>
          )}
          {config.github && (
            <a href={config.github} rel="noopener noreferrer" target="_blank">
              Github
            </a>
          )}
          {config.twitch && (
            <a href={config.twitch} rel="noopener noreferrer" target="_blank">
              Twitch
            </a>
          )}
          {config.youtube && (
            <a href={config.youtube} rel="noopener noreferrer" target="_blank">
              Youtube
            </a>
          )}
          {config.linkedin && (
            <a href={config.linkedin} rel="noopener noreferrer" target="_blank">
              Linkedin
            </a>
          )}
          <a href="/rss.xml">RSS</a>
        </SiteFooterNav>
      </div>
    </footer>
  );
};

export default Footer;
