export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * full url, no username
   */
  github?: string;
  /**
   * full url, no username
   */
  twitch?: string;
  /**
   * full url, no username
   */
  linkedin?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
}

const config: WebsiteConfig = {
  title: "Opinionated blog by Gonzalo Pozzo",
  description: "Senior Frontend Developer | Cypress.io Ambassador",
  coverImage: "meta/img/blog-cover.jpg",
  logo: "meta/img/logo.png",
  lang: "en",
  siteUrl: "https://goncy.netlify.com",
  twitter: "https://twitter.com/goncy",
  github: "https://github.com/goncy",
  twitch: "https://www.twitch.tv/goncypozzo",
  linkedin: "https://www.linkedin.com/in/gonzalopozzo/",
  showSubscribe: false,
};

export default config;
