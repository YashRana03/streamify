export default function Footer() {
    return (
        <>
            <footer>
                <div className="social-links-container">
                    <div className="circle">
                        <a href="https://github.com/YashRana03" target="_new"><i className="fa-brands fa-github social-links"></i></a>
                        
                    </div>
                    <div className="circle">
                        <a href="https://linkedin.com/in/yash-rana-kumar-988a86252" target="_new"><i className="fa-brands fa-linkedin-in social-links"></i></a>
                        
                    </div>
                </div>
                <div className="credits">
                    <img src="/images/tmdb.svg" alt="tmdb logo" className="tmdb-logo" />
                    <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>

                </div>
            </footer>

        </>
    )
}