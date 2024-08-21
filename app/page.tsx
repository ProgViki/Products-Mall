
// import ProductList from "./Products";

import ProductList from "./products";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <ProductList />
     {/* <div>
      <p className="font-bold text-2xl">This is my product page</p>
     </div> */}
    </main>
  );
}
