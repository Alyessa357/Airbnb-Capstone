import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

import "./CopyrightFooter.css";

const CopyrightFooter = () => {
    return (
        <div className="copyright-footer">

            <div className="copyright-left">

                <p>
                    © 2026 Airbnb, Inc.
                </p>

                <span>·</span>

                <p>
                    Privacy
                </p>

                <span>·</span>

                <p>
                    Terms
                </p>

                <span>·</span>

                <p>
                    Sitemap
                </p>

            </div>

            <div className="copyright-right">

                <div className="language-selector">

                    <FaGlobe />

                    <span>
                        English (ZA)
                    </span>

                </div>

                <div>
                    ZAR
                </div>

                <FaFacebook />

                <FaTwitter />

                <FaInstagram />

            </div>

        </div>
    );
};

export default CopyrightFooter;