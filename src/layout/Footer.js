import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <div>
      <footer>
        <div className="text-center">
          <h2>MOSES</h2>
          <h3>findme@toyatoyaKe.com</h3>
          <p>2023 MamaNgina dr,Post office Box 223
            Liwatoni,<br/>Mombasa -173821
          </p>
        </div>
        <hr/>
        <div className="text-center">
           <p>All rights reserved | This template is made with by MOSES</p>
           <div id="icons">
              <p>Stay Connected</p>
            <div className='col-md-3 offset-md-3'>
            <Link to="" target="_blank">
               <i class="fa fa-instagram" aria-hidden="true"></i>
            </Link>
            <Link to="" target="_blank">  
               <i class="fa fa-twitter" aria-hidden="true"></i>
            </Link>
            <Link to="" target="_blank">
               <i class="fa fa-facebook" aria-hidden="true"></i>
            </Link>
            <Link to="" target="_blank">
               <i class="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
            <Link to="" target="_blank">
               <i class="fa fa-github" aria-hidden="true"></i>
            </Link>
            </div>
           </div>
        </div>
      </footer>
    </div>
  )
}
