import { auth } from "@/auth";
  const Home = async () => {
    const session = await auth();
    
    console.log("Session:", session);
  return (
    <>
      <h1 className="">Welcome to Next.js 👋</h1>
    </>
  );
};
export default Home;
