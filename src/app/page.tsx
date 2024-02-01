import Products from "@/components/Products/Products";
import NavBar from "@/components/NavBar/NavBar";

export default async function Home() {
  return (
    <>
      <NavBar />
      <Products />
    </>
  );
}
