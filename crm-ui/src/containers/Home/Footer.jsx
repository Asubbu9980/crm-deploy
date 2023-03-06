import React from 'react'
import footerLogo from '../../assets/images/footer-logo.png'
import { Box } from '@mui/system'
import './Footer.scss'

function Footer() {
  return (
    <div>
      <div>
            <section className='footer-section py-5'>
                <Box className='container'>
                    <Box className='row'>
                        <Box className='col-sm-5 col-md-5 col-lg-3'>
                            <p>Powered by</p>
                            <img src={footerLogo} width={160} className="img-fluid mb-3" alt="office" />
                            <Box>
                                Knowledge City Rai Durg,<br />
                                Hyderabad, Telangana, India.<br /> 
                                Tel: +91 40 4651 5454<br />
                            </Box>
                        </Box>
                        <Box className='col-sm-5 col-md-5 col-lg-3'>
                            <a href="#" className="link-light d-block">Initiatives</a>
                            <a href="#" className="link-light d-block">Financial Services</a>
                            <a href="#" className="link-light d-block">Employee &#x26; Employer Financial Wellness</a>
                        </Box>
                        <Box className='col-sm-5 col-md-5 col-lg-3'>
                            <a href="#" className="link-light d-block">Initiatives</a>
                            <a href="#" className="link-light d-block">Financial Services</a>
                            <a href="#" className="link-light d-block">Employee &#x26; Employer Financial Wellness</a>
                        </Box>
                        <Box className='col-sm-5 col-md-5 col-lg-3'>
                            <a href="#" className="link-light d-block">Contact Us</a>
                            <a href="#" className="link-light d-block">About Us</a>
                            <a href="#" className="link-light d-block">Terms</a>
                            <a href="#" className="link-light d-block">Packages</a>
                            <a href="#" className="link-light d-block">FAQ</a>
                        </Box>
                    </Box>
                </Box>
            </section>
        </div>
    </div>
  )
}
 
export default Footer