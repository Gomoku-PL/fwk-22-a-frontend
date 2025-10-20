import React from "react";
import PropTypes from "prop-types";
import "./securityNotice.css";

const SecurityNotice = ({ https = true, encryption = true, auth = true, docsLink = "#" }) => {
    return (
        <div className="security-notice">
            <h2>Security Status</h2>
            <div className="badges">
                <span className={`badge ${https ? "secure" : "insecure"}`} title="HTTPS enabled">
                    HTTPS
                </span>
                <span className={`badge ${encryption ? "secure" : "insecure"}`} title="Data encrypted">
                    Encryption
                </span>
                <span className={`badge ${auth ? "secure" : "insecure"}`} title="Authentication enabled">
                    Auth
                </span>
            </div>

            <a href={docsLink} target="_blank" rel="noopener noreferrer" className="learn-more">
                Learn more
            </a>


        </div>
    );
};

SecurityNotice.propTypes = {
    https: PropTypes.bool,
    encryption: PropTypes.bool,
    auth: PropTypes.bool,
    docsLink: PropTypes.string,
};

export default SecurityNotice;
