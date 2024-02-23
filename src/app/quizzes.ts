type Quiz = {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
};
type Quizzes = {
  [id: string]: { quizzes: Quiz[]; iconURL: string; name: string };
};

export const quizzes: Quizzes = {
  touyan: {
    iconURL:
      "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_168/https%3A%2F%2Fi.imgur.com%2Fe9Gba3p.png",
    name: "0xTouYan",
    quizzes: [
      {
        question: "What country is 0xTouYan from?",
        option1: "China",
        option2: "UK",
        option3: "Japan",
        option4: "Indonesia",
        answer: 3,
      },
      {
        question: "What is the origin of the name 0xTouYan?",
        option1: "His favorite curry place",
        option2: "His childhood nickname",
        option3: "His favorite YouTuber",
        option4: "Names of places he first traveled to",
        answer: 1,
      },
      {
        question: "What crypto books 0xTouYan loves to read",
        option1: "Bitcoin White Paper",
        option2: "The Cryptopians",
        option3: "Read Write Own",
        option4: "The Network State",
        answer: 4,
      },
    ],
  },
};
