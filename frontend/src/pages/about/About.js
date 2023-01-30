import React from "react";
import {
  TextBox,
  AboutContainer
} from "./AboutStyle";


const About = () => {

  return (
    <AboutContainer>
     <TextBox>
        This webbsite is created as a final-project built during last sprint of Technigo webdeveloper bootcamp -22/23. 
        The vision was to build a space plattform were users can loggin to their userprofile, see NASA pictures and visit a forum to ask questions about space. 
        I see the page not only as a final project, but also a project for my own continues learning. 
        So at the moment, as it is still under construction, the plattform lacks some functions. 
        My idea is that the page in the end will have several functions such as users can handle answers the same way they can handle questions - delete, like and dislike answers.
        I will also develop a userpage were the user can save their favourite posts.
     </TextBox>
    </AboutContainer>
  ) 
}

export default About;


