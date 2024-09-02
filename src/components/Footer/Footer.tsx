import './Footer.css'

const Footer = () => {

    return (
        <footer>

            <div className="footer__logo">
                <img src='logo.png' alt='' />
            </div>
            <nav >

                <a href='' target='_blank'>F.A.Q</a>
                <a href='' target='_blank'>Sobre Nós</a>
                <a href='' target='_blank'>Contato</a>


            </nav>
            <nav >
                <a href='' target='_blank'>Suporte</a>
                <a href='' target='_blank'>Serviços</a>
                <a href='' target='_blank'>Termos</a>

            </nav>

            <div className="footer__social">
                <h3>Social Media</h3>
                <nav>
                    <a href='https://www.linkedin.com/in/fbianog/' target='_blank' title='Linkedin'><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href='https://www.instagram.com/fbiano.1/' target='_blank' title='Intagram'><i className="fa-brands fa-instagram"></i></a>
                    <a href='https://github.com/FbianoG' target='_blank' title='GitHub'><i className="fa-brands fa-github"></i></a>
                    <a href='https://fgportfolio.vercel.app/' target='_blank' title='Portfólio'><i className="fa-solid fa-globe"></i></a>

                </nav>
            </div>

            <span className='spanBar'>© 2024 - Game Less / Todos os Direitos Reservados</span>

        </footer>
    )
}

export default Footer