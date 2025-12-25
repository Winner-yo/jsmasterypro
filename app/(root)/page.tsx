import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/search/LocalSearch";
const Home = async () => {
       
  return (
    <>
    <section className="flex w-full flex-col-reverse 
    justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="h1-bold text-dark100_light900">All Questions</h1>

      <Button className="primary-gradient min-h-[46px] px-4 py-3
      !text-light-900" asChild>
      <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
      </Button>
    </section>
    <section className="mt-11">
      <LocalSearch
      routes="/"
      imgSrc="/icons/search.svg"
      placeholder="Search for questions..."
      otherClasses="flex-1"
      />
      </section>
    HomeFilter
    <div className="mt-10 flex w-full flex-col gap-5">
      <p>Questions Card 1</p>
      <p>Questions Card 2</p>
      <p>Questions Card 3</p>
      <p>Questions Card 4</p>
      <p>Questions Card 5</p>
      <p>Questions Card 6</p>
    </div>
    </>
  );
};
export default Home;
