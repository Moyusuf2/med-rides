import React from 'react';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
    < div className='about'>
      <h2>Technologies used:</h2>
      <br />
      <ul>
        <li>Javascript</li>
        <li>React</li>
        <li>Redux</li>
        <li>Redux-Saga</li>
        <li>Node.js</li>
        <li>Postico and Postman</li>
        <li>Passport.js- for authentication</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>SweetAlert</li>
      </ul>
      <br></br>
      <h2>Challenges:
      </h2>
      <br />
      <p> Using multiple API to calculate distance, duration of request, and to display map.</p>
      <br></br>
      <br></br>
      <h3>Special thank you</h3>
      <br />
      <p>My family for always supporting me</p>
      <p>My instructors Edan and Kris</p>
      <p>and the Ramirez Cohort </p>
    </div>
    <div className='profile'>
    <h2>Connect with me on LinkedIn</h2>
    <img src="images/profilePic.jpeg" alt="" />
    </div>
    </>
  );
}

export default AboutPage;
