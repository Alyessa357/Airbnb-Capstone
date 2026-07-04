import { FaFacebookF, FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";

import "../styles/adminFooter.css";

const FOOTER_SECTIONS = [
    {
        title: "Support",
        links: [
            "Help Center",
            "Safety information",
            "Cancellation options",
            "Our COVID-19 Response",
            "Supporting people with disabilities",
            "Report a neighborhood concern",
        ],
    },
    {
        title: "Community",
        links: [
            "Airbnb.org: disaster relief housing",
            "Support: Afghan refugees",
            "Celebrating diversity & belonging",
            "Combating discrimination",
        ],
    },
    {
        title: "Hosting",
        links: [
            "Try hosting",
            "AirCover: protection for Hosts",
            "Explore hosting resources",
            "Visit our community forum",
            "How to host responsibly",
        ],
    },
    {
        title: "About",
        links: [
            "Newsroom",
            "Learn about new features",
            "Letter from our founders",
            "Careers",
            "Investors",
            "Airbnb Luxe",
        ],
    },
];

const AdminFooter = () => {
    return (
        <footer className="admin-footer">
            <div className="admin-footer__grid">
                {FOOTER_SECTIONS.map((section) => (
                    <div key={section.title}>
                        <h3>{section.title}</h3>
                        {section.links.map((link) => (
                            <p key={link}>{link}</p>
                        ))}
                    </div>
                ))}
            </div>

            <div className="admin-footer__copyright">
                <div className="admin-footer__copyright-left">
                    <span>© 2022 Airbnb, Inc.</span>
                    <span>·</span>
                    <span>Privacy</span>
                    <span>·</span>
                    <span>Terms</span>
                    <span>·</span>
                    <span>Sitemap</span>
                </div>

                <div className="admin-footer__copyright-right">
                    <span className="admin-footer__language">
                        <FaGlobe />
                        English (US)
                    </span>
                    <span>$ USD</span>
                    <FaFacebookF />
                    <FaTwitter />
                    <FaInstagram />
                </div>
            </div>
        </footer>
    );
};

export default AdminFooter;
