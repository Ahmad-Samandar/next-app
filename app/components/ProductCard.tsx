// "use client"; // --> This will convert this compoent to be rendered on client side
import React from "react";
import AddToCard from "./AddToCard";

const ProductCard = () => {
  return (
    <div>
      {/* <button onClick={() => console.log("Hello")}>Add to cart</button> */}
      {/*  There is a problem in here if we use this component, 
      "vent handlers cannot be passed to Client Component props."
      To fix this error we have two ways, the first is to write down,
      "use client" on top.
      Or we can transfer the portion where we need to keep track of events and activity to
      another component and make that component as client side rendered.  */}
      <AddToCard />
      {/* Now this is an example of client and server components */}
    </div>
  );
};

export default ProductCard;
