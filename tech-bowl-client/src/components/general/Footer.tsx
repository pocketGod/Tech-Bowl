import { FunctionComponent } from "react";

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    return ( <>
    <div className="footer-container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="col-md-4 d-flex align-items-center">
                    
                    <img src="/logo.png" className="footer-logo me-2"/>
                  
                    <span className="mb-3 mb-md-0">Coded By Aviv Shleyfman &copy; 2022 Tech-Bowl Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <a className="text-muted footer-link" href="https://aviv-shleyfman-portfolio.netlify.app/" target={'_blank'}>
                            <i className="fa-solid fa-rainbow"></i>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted footer-link" href="https://github.com/pocketGod" target={'_blank'}>
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted footer-link" href="https://www.linkedin.com/in/aviv-shleyfman/" target={'_blank'}>
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    
    </> );
}
 
export default Footer;