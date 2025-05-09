import React from 'react';
import './ParallaxBackground.css';
import Spline from '@splinetool/react-spline';

const ParallaxBackground = () => {
  return (
    <div className="parallax-wrapper">
      {/* Main container with flex layout to position left text and isolated spline robot side by side */}
      <div className="container parallax-flex">
        {/* Left side text added as per user request */}
        <div className="spline-container">
          <Spline 
            scene="https://prod.spline.design/nBQNpgz0XGvJNTsa/scene.splinecode" 
          />
        </div>
        <div className="content_heading">
          <span className="content_style">Hi,</span>
          <span className="content_style">Welcome To GreenTogether</span>
        </div>
        {/* Isolated container for spline robot to avoid style interference */}
        
      </div>
      <div className="section_one">
        <h2>Section One</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio dicta libero voluptate doloribus delectus quisquam, exercitationem quos natus aspernatur, eligendi iste iusto, consequuntur minima eos vel repudiandae doloremque eius? Aperiam dolor minus, quae, voluptatem repudiandae vel cum nostrum corporis aliquam veniam itaque eligendi, velit qui ad possimus delectus officia? Optio iste ut laboriosam perspiciatis amet id nisi, veritatis, laudantium sunt ullam similique dicta provident tempore tenetur. Nulla illo eligendi laudantium, officiis veniam consectetur culpa consequatur et inventore, sunt aliquid veritatis totam ut fuga sit quibusdam quaerat repellat accusantium modi ipsam nisi! Provident autem atque ad optio magni saepe id modi
        </p>
      </div>
      <div className="image2">
        <div className="image2_content">
          <span className="image2_style">Explore nature</span>
        </div>
      </div>
      <div className="section_two">
        <h2>Section Two</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus beatae aperiam eaque eligendi debitis, sint libero a ducimus dolorem hic labore at nobis quo quas non praesentium quos molestias, minima enim amet? Magnam possimus soluta adipisci fugiat, deserunt eveniet vitae quae eaque nostrum, ratione necessitatibus debitis atque dolorem obcaecati? Maxime molestiae quibusdam dolorum magni nesciunt quod quis exercitationem necessitatibus autem? Necessitatibus corporis impedit rem nihil sit quos placeat distinctio expedita laboriosam atque provident debitis similique inventore aperiam, ab quam explicabo exercitationem. Itaque consequatur reprehenderit vel velit quas temporibus repellendus fuga dolor ipsa vitae, sunt quibusdam aliquam perspiciatis nam quo. Tempora.
        </p>
      </div>
      <div className="image3">
        <div className="image3_content">
          <span className="image3_style">Look , Deep into nature</span>
        </div>
      </div>
      <div className="section_three">
        <h2>Section Three</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus beatae aperiam eaque eligendi debitis, sint libero a ducimus dolorem hic labore at nobis quo quas non praesentium quos molestias, minima enim amet? Magnam possimus soluta adipisci fugiat, deserunt eveniet vitae quae eaque nostrum, ratione necessitatibus debitis atque dolorem obcaecati? Maxime molestiae quibusdam dolorum magni nesciunt quod quis exercitationem necessitatibus autem? Necessitatibus corporis impedit rem nihil sit quos placeat distinctio expedita laboriosam atque provident debitis similique inventore aperiam, ab quam explicabo exercitationem. Itaque consequatur reprehenderit vel velit quas temporibus repellendus fuga dolor ipsa vitae, sunt quibusdam aliquam perspiciatis nam quo. Tempora.
        </p>
      </div>
      <div className="container">
        <div className="content_heading">
          <span className="content_style">Continue Learning...</span>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
