import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import styled from 'styled-components';

import { config } from 'config';

const StyledFooter = styled.footer`
    background-color: #292b2c;
    color: #ddd;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 80px 0;
    margin-top: 0;

    .container > .row > div {
        margin-top: 0;

        @media (max-width: 576px) {
            & + div {
                margin-top: 30px;
            }
        }
    }
    
    .about > * {
        margin-bottom: 15px;
    }
`;

const FooterButton = styled.a`
    font-size: 12px;
    display: inline-block;
    padding: 10px;
    border: 1px solid #fff;
    text-transform: uppercase;
`;

const StyledIcon = styled.a`
    font-size: 32px;
    line-height: 32px;
    padding-right: 10px;
`;

const SocialIcon = ({ link, icon, title }) => (
    <StyledIcon href={link} target="_blank" rel="noopener noreferrer">
        <i className={`fa fa-${icon}`} aria-hidden="true" title={title} />
        <span className="sr-only">{title}</span>
    </StyledIcon>
);

class Footer extends React.Component {
    render() {
        const { featured, openSource } = this.props;
        return (
            <StyledFooter>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 push-md-4 col-sm-12 projects">
                            <h4>Featured Projects</h4>
                            <ul className="list-unstyled">
                                {featured.map(project => (
                                    <li key={project.title}>
                                        <Link to={prefixLink(project.path)}>
                                            {project.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-4 push-md-4 col-sm-12 projects">
                            <h4>Open Source on GitHub</h4>
                            <ul className="list-unstyled">
                                {openSource.map(({ repo, user }) => (
                                    <li key={repo}>
                                        <a
                                            href={`https://github.com/${user}/${repo}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {repo}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-4 pull-md-8 col-sm-12 about">
                            <Link to={prefixLink('/')}>
                                <h4>Adam Krogh</h4>
                            </Link>
                            <div>
                                <SocialIcon
                                    link="https://github.com/adamkrogh"
                                    icon="github"
                                    title="GitHub Profile"
                                />
                                <SocialIcon
                                    link="https://twitter.com/adamkrogh"
                                    icon="twitter"
                                    title="Twitter Profile"
                                />
                                <SocialIcon
                                    link="https://www.linkedin.com/in/adamkrogh"
                                    icon="linkedin"
                                    title="LinkedIn Profile"
                                />
                            </div>
                            <FooterButton
                                href={config.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Résumé
                            </FooterButton>
                        </div>
                    </div>
                </div>
            </StyledFooter>
        );
    }
}

export default Footer;
