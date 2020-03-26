import React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/core";

import {
  AuthorProfileImage,
  inner,
  outer,
  Backdrop,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SocialLink,
} from "../../styles/shared";
import Github from "../icons/github";
import Twitch from "../icons/twitch";
import Facebook from "../icons/facebook";
import Website from "../icons/website";
import Twitter from "../icons/twitter";

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorMeta = styled.div`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  font-family: Georgia, serif;
  font-style: italic;
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 5px 0 10px 0;
  max-width: 600px;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

const Bull = styled.span`
  display: inline-block;
  margin: 0 12px;
  opacity: 0.5;
`;

const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: 0 0 20px 0;
  width: 100px;
  height: 100px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
`;

interface AuthorHeaderProps {
  author: {
    id: string;
    name?: string;
    website?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
    twitch?: string;
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
}

const AuthorHeader: React.FC<AuthorHeaderProps> = ({author}) => {
  return (
    <header
      className="no-cover"
      css={[outer, SiteHeader]}
      style={{
        backgroundImage: author.profile_image ? `url(${author.profile_image.childImageSharp.fluid.src})` : "",
      }}
    >
      <Backdrop opacity={0.7} />
      <div css={inner}>
        <SiteHeaderContent>
          <img
            alt={author.id}
            css={[AuthorProfileImage, AuthorProfileBioImage]}
            src={author.avatar.childImageSharp.fluid.src}
          />
          <SiteTitle>{author.name || author.id}</SiteTitle>
          {author.bio && <AuthorBio>{author.bio}</AuthorBio>}
          <AuthorMeta>
            {author.location && (
              <div css={HiddenMobile}>
                {author.location} <Bull>&bull;</Bull>
              </div>
            )}
            {author.website && (
              <div>
                <a
                  className="social-link-wb"
                  css={SocialLink}
                  href={author.website}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Website"
                >
                  <Website />
                </a>
              </div>
            )}
            {author.twitter && (
              <a
                className="social-link-tw"
                css={SocialLink}
                href={`https://twitter.com/${author.twitter}`}
                rel="noopener noreferrer"
                target="_blank"
                title="Twitter"
              >
                <Twitter />
              </a>
            )}
            {author.facebook && (
              <a
                className="social-link-fb"
                css={SocialLink}
                href={`https://www.facebook.com/${author.facebook}`}
                rel="noopener noreferrer"
                target="_blank"
                title="Facebook"
              >
                <Facebook />
              </a>
            )}
            {author.github && (
              <a
                className="social-link-github"
                css={SocialLink}
                href={`https://www.github.com/${author.github}`}
                rel="noopener noreferrer"
                target="_blank"
                title="Github"
              >
                <Github />
              </a>
            )}
            {author.twitch && (
              <a
                className="social-link-twitch"
                css={SocialLink}
                href={`https://www.twitch.tv/${author.twitch}`}
                rel="noopener noreferrer"
                target="_blank"
                title="Twitch"
              >
                <Twitch />
              </a>
            )}
          </AuthorMeta>
        </SiteHeaderContent>
      </div>
    </header>
  );
};

export default AuthorHeader;
