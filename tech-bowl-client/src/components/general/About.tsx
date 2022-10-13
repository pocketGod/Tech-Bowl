import { FunctionComponent } from "react";

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
    return ( <div>
        <h1 className="display-1 text-center mt-4 page-title">
                About
            </h1>
            <div className="container">
                <div className="section-container row text-center">
                    <div className="col-12 col-md-6">
                        <h1 className="display-5">Tech Bowl</h1>
                        <p className="display-6 fs-5">
                            Fake store, where you can "fake" buy various electronics with in-site currency. upon registration each user will recieve a starter amount and could increase it by playing in-site mini games.
                        </p>
                        <hr />
                        <p className="mb-4 display-6 fs-5">
                            This system was made as a 24 Hour Coding challenge.
                            <br />
                            First 45 minutes was purely theoretical, drawing a schema on a paper.
                            <br />
                            The schema represented the various endpoints (in a server) and collections (in a DB) I needed.
                            <br />
                            Then it was like a marathon of aproximitly 8 Hours developing server & client side.
                            <br />
                            Finally a few hours of illustrator and general front-end touch-ups and Tech-Bowl was DONE!
                            <br />
                            <br />
                            <strong>DISCLAINER</strong>
                            <br />
                            Befoe deployment i did a few more tweeks and touchups and expanded the database. (during development the DB was consisted of 3 products)
                        </p>

                        <hr />
                        <div className="row display-6 fs-5 text-center">
                            <div className="col-lg-6 col-12">
                                <div className="table-container">
                                    <table className="about-table">
                                        <thead>
                                            <tr><th colSpan={2}>Stack</th></tr>
                                            <tr><th>Back</th><th>Front</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Node.JS</td><td>React</td>
                                            </tr>
                                            <tr>
                                                <td>Javascript</td><td>Typescript</td>
                                            </tr>
                                            <tr>
                                                <td>Express</td><td>CSS</td>
                                            </tr>
                                            <tr>
                                                <td>MongoDB</td><td>Bootstrap</td>
                                            </tr>
                                            <tr>
                                                <td>bCrypt</td><td>Canvas</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="table-container">
                                    <table className="about-table">
                                        <thead>
                                            <tr><th>Features</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>CRUD Operations</td></tr>
                                            <tr><td>User Authentication</td></tr>
                                            <tr><td>Data Enc/Decryption</td></tr>
                                            <tr><td>Custom API Service</td></tr>
                                            <tr><td>Custom Interfaces</td></tr>
                                            <tr><td>Basic Game Logics</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h1 className="display-5 text-center">Aviv Shleyfman</h1>
                        <p className="display-4 fs-3">I'm a full stack web developer, located in Israel.
                        Actively looking for collaborations, Please dont hesitate to reach out!</p>
                        <div className="row display-4 fs-3">
                            <div className="col-12 col-md-6 about-link-container">
                                <p className="">
                                    <i className="fa-solid fa-link"></i>
                                </p>
                                <a className="about-link" href="https://aviv-shleyfman-portfolio.netlify.app/" target={'_blank'}>Portfolio</a>
                                
                                <a className="about-link" href="https://www.linkedin.com/in/aviv-shleyfman/" target={'_blank'}>LinkedIn</a>
                                
                                <a className="about-link" href="https://github.com/pocketGod" target={'_blank'}>GitHub</a>
                                
                            </div>
                            <div className="col-12 col-md-6">
                                <img src="/me.png" alt="" className="my-pic"/>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
    </div> );
}
 
export default About;