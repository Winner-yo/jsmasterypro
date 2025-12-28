interface Tag {
    _id: number;
    name: string;
}
 interface Author {
    _id: number;
     name: string;
     image?: string;
}
interface Question {
    _id: number;
    title: string;
    description: string;
    tags: Tag[];
    author: Author;
    upvotes: number;
    answers: number;
    views: number;
    createdAt: Date;
}