import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import BackPack from "./../img/Backpack.png";
import Camera from "./../img/Camera.png";
import Cupcake from "./../img/Cupcake.png";
import Fragrance from "./../img/Fragrance.png";
import GameBoy from "./../img/GameBoy.png";
import Goku from "./../img/Goku.png";
import Headphone from "./../img/Headphone.png";
import RayBan from "./../img/RayBan.png";
import WatchPic from "./../img/WatchPic.png";
import Speaker from "./../img/Speaker.png";
import Shoe from "./../img/Shoe.png";

const mainProductList = [
  {
    title: "Backpack",
    description: "Super awesome backpack. Bought for myself but only used once. Doesn't fit. Has many many features and is super awesome. You will love.",
    price: 99.99,
    condition: "Like New",
    image: <img src={BackPack} alt="backpack" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />,
    seller: "Sam Jackson"
  },
  {
    title: "Camera",
    description: "Sick camera bro. Used it a few times. turns out I don't like taking pics.",
    price: 199.99,
    condition: "Like New",
    image: <img src={Camera} alt="camera" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Jonny Rico"
  },
  {
    title: "Cupcake",
    description: "Delicious Cupcake. Made it myself.",
    price: 2.99,
    condition: "New",
    image: <img src={Cupcake} alt="cupcake" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Billy Madison"
  },
  {
    title: "Fragrance",
    description: "Smells super awesome. Received as a gift, but not my style.",
    price: 99.99,
    condition: "New",
    image: <img src={Fragrance} alt="fragrance" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Sally Johnson"
  },
  {
    title: "Game Boy Color",
    description: "Remember when you were a kid and really wanted one, but never could afford it? Well, now you can! Comes with Pokemon Blue and Zelda!",
    price: 89.99,
    condition: "Used",
    image: <img src={GameBoy} alt="gameboy" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Vito Giuswaldi"
  },
  {
    title: "Headphones Bro",
    description: "Name Brand headphones. Barely used. In excellent condition.",
    price: 69.99,
    condition: "Like New",
    image: <img src={Headphone} alt="gameboy" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Jim Gaffigan"
  },
  {
    title: "RayBan Sunglasses",
    description: "Like New RayBans aviator style sunglasses.",
    price: 129.99,
    condition: "Like New",
    image: <img src={RayBan} alt="sunglasses" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Tom Cruise"
  },
  {
    title: "Goku action figure",
    description: "Defeat Fagita and find the seven Dragon Balls so you can have your one wish fulfilled.",
    price: 12.99,
    condition: "Used",
    image: <img src={Goku} alt="goku toy" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Vito Giuswaldi"
  },
  {
    title: "Smart watch",
    description: "Sweet Smartch, totally works with your phone broh. Totally good condition broh.",
    price: 199.99,
    condition: "Like New",
    image: <img src={WatchPic} alt="a watch" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Clarence Farthington"
  },
  {
    title: "Speaker",
    description: "New smart speaker. Never opened.",
    price: 89.99,
    condition: "New",
    image: <img src={Speaker} alt="speaker" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Jonny Rotten"
  },
  {
    title: "Shoe",
    description: "Brand new never worn shoe.",
    price: 199.99,
    condition: "New",
    image: <img src={Shoe} className="img-fluid" alt="a watch" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>,
    seller: "Sam Hyde"
  }
];

function ProductList() {
  return (
    <React.Fragment>
      <hr />
      {mainProductList.map((product, index) =>
        <Product image={product.image}
          title={product.title}
          description={product.description}
          condition={product.condition}
          price={product.price}
          seller={product.seller}
          key={index}
        />
      )}
    </React.Fragment>
  );
}

export default ProductList;