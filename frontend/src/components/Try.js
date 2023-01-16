import React, { useEffect, useState } from 'react';

const MeteorRain = () => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const meteorInterval = setInterval(() => {
      setMeteors(meteors => [
        ...meteors,
        {
          x: Math.random() * window.innerWidth,
          y: 0
        }
      ]);
    }, 100);

    const meteorMovementInterval = setInterval(() => {
      setMeteors(meteors =>
        meteors.map(meteor => {
          meteor.y += 10;
          if (meteor.y > window.innerHeight) {
            return null;
          }
          return meteor;
        })
      );
    }, 10);

    return () => {
      clearInterval(meteorInterval);
      clearInterval(meteorMovementInterval);
    };
  });

  return (
    <><div className="meteor" key={meteors} style={{
          top: meteors.y,
          left: meteors.x
      }}></div><div className="meteor-rain">
              {meteors}
          </div></>
  );
};


   
export default MeteorRain
    
  //TO DO: storage - redux or locale storage? set authorization, save to userprofile page, delete answers, like/dislike answers, let user set topic, let user filter topics, 
// TO DO:filter according to top/bottom votes/likes, math random "todays question"

// QUESTION: To save wanted post to user profile: can i filter out wanted data in the POST request response date, or do I have to create anoter function and filter out in the return?
//configure store, persisted JSON    

    







  
  
  