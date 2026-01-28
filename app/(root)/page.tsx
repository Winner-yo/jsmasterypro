// import { SearchParams} from "next/dist/server/request/search-params";
import Link from "next/link";

import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
// import { api } from "@/lib/api";
// import { handleError } from "@/lib/handlers/error";



  
const questions = [
  {
    _id: 101,
    title: "How does React reconciliation work?",
    description:
      "Can someone explain React's reconciliation algorithm, how the virtual DOM diffing works, and best practices for using keys?",
    tags: [
      { _id: 201, name: "React" },
      { _id: 202, name: "Virtual DOM" },
    ],
    author: {
      _id: 301,
      name: "Alice Rivera",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    },
    upvotes: 42,
    answers: 5,
    views: 1200,
    createdAt: new Date(),
  },
  {
    _id: 102,
    title: "Best practices for data fetching in Next.js App Router?",
    description:
      "What are the recommended patterns for data fetching in Next.js 13+ using the App Router (server components, client components, fetch caching)?",
    tags: [
      { _id: 203, name: "Next.js" },
      { _id: 204, name: "Data Fetching" },
    ],
    author: {
      _id: 302,
      name: "Bob Lee",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    },
    upvotes: 28,
    answers: 3,
    views: 860,
    createdAt: new Date(),
  },
  {
    _id: 103,
    title: "What's the difference between == and === in JavaScript?",
    description:
      "I often see == and === used. How do they differ, when does type coercion happen, and when should I use each?",
    tags: [
      { _id: 205, name: "JavaScript" },
      { _id: 206, name: "Type Coercion" },
    ],
    author: {
      _id: 303,
      name: "Carol Nguyen",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    },
    upvotes: 16,
    answers: 4,
    views: 540,
    createdAt: new Date(),
  },
  {
    _id: 104,
    title: "How to type React component props in TypeScript?",
    description:
      "What are clean approaches to type functional component props in TypeScript, including optional props, default props, and generics?",
    tags: [
      { _id: 207, name: "TypeScript" },
      { _id: 208, name: "Generics" },
    ],
    author: {
      _id: 304,
      name: "Daniel Kim",
        image:
          "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    },
    upvotes: 34,
    answers: 6,
    views: 980,
    createdAt: new Date(),
  },
];

// const test = async () => {
//   try {
//     return await api.users.getAll();
//   } catch (error) {
//     handleError(error);
//   }
// };
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();
  console.log("Session:", session);
  // const users = await test();
  // console.log(users);
  

  const { query = "", filter = "" } = await searchParams;
  const filterQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());
    const matchesFilter = filter
      ? question.tags.some(
          (tag) => tag.name.toLowerCase() === filter.toLowerCase()
        )
      : true;
    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section
        className="flex w-full flex-col-reverse 
    justify-between gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3
         text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-5">
        {filterQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
          
        ))}
      </div>
    </>
  );
};
export default Home;
