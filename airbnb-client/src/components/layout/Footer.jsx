import "./Footer.css";

// Footer link columns — Support, Community, Hosting, About
const footerSections = [
    {
        title: "Support",
        links: [
            "Help Centre",
            "Safety information",
            "Cancellation options",
            "Our COVID-19 Response",
            "Supporting people with disabilities"
        ]
    },
    {
        title: "Community",
        links: [
            "Airbnb.org",
            "Support Afghan refugees",
            "Combating discrimination"
        ]
    },
    {
        title: "Hosting",
        links: [
            "Try hosting",
            "AirCover for Hosts",
            "Explore hosting resources",
            "Visit our community forum"
        ]
    },
    {
        title: "About",
        links: [
            "Newsroom",
            "Learn about new features",
            "Careers",
            "Investors"
        ]
    }
];

// Site-wide footer with four columns of links
const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                {
                    footerSections.map(
                        section => (
                            <div
                                key={section.title}
                                className="footer-column"
                            >
                                <h3>
                                    {section.title}
                                </h3>

                                {
                                    section.links.map(
                                        link => (
                                            <p key={link}>
                                                {link}
                                            </p>
                                        )
                                    )
                                }

                            </div>
                        )
                    )
                }

            </div>

        </footer>
    );
};

export default Footer;
