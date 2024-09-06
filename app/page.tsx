import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h3>Hello Human!</h3>
      {/* <a href="/users">Users Page</a> */}
      {/* In next.js, if we use the a tag in order to navigate throug different pages
      this is not the optimal solution, what's happening behind the scene is if we inspect the 
      network tab in the browser, while we navigate to another page the entire resources
      will be reloaded which is something we don't want. We only want to reload or see the
      content of the page not the repetitive parts of the page like header, sidebar and etc.
      
      Tha'ts why in next.js we have this Link tag which comes from next/Link libryary to user
      in order to solve this proble.*/}
      <Link href="/users">Users Page</Link>
      {/* This is called client side navigation */}
      <ProductCard />
    </main>
  );
}
