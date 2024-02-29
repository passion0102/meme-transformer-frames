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
  starkcity: {
    iconURL:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/qk/5b1e17d6-3c78-4186-b3ec-464a8255909f",
    name: "StarkCity Denver",
    quizzes: [
      {
        question: "What color wristbands could we get at StarkCity?",
        option1: "Light blue",
        option2: "Black",
        option3: "Purple",
        option4: "Orange",
        answer: 1,
      },
      {
        question:
          "According to Loothero, the year 2024 in FOCG corresponds to what year in arcade games?",
        option1: "1971",
        option2: "1981",
        option3: "1990",
        option4: "2010",
        answer: 2,
      },
      {
        question: "What of the following is not a part of Toolchain, Dojo?",
        option1: "Katana",
        option2: "Sozo",
        option3: "Torii",
        option4: "Kimono",
        answer: 4,
      },
    ],
  },
  "vitalik.eth": {
    iconURL:
      "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_jpg,w_168/https%3A%2F%2Fi.imgur.com%2FIzJxuId.jpg",
    name: "Vitalik Buterin",
    quizzes: [
      {
        question: "Which university did Vitalik enroll in?",
        option1: "University of Waterloo",
        option2: "Moscow State University",
        option3: "MIT",
        option4: "Stanford University",
        answer: 1,
      },
      {
        question:
          "What happened to Vitalik’s character in World of Warcraft that motivated him to create decentralized system?",
        option1: "His character was deleted",
        option2: "His character became the most powerful in the game",
        option3: "His character's abilities were significantly nerfed",
        option4: "His character was hacked",
        answer: 3,
      },
      {
        question:
          "Which of the following is a famous quote which was used in Vitalik’s blog?",
        option1: "Make America Great Again",
        option2: "Make Ethereum Network States Again",
        option3: "Make Ethereum World Computer Again",
        option4: "Make Ethereum Cypherpunk Again",
        answer: 4,
      },
    ],
  },
  touyan: {
    iconURL:
      "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_168/https%3A%2F%2Fi.imgur.com%2Fe9Gba3p.png",
    name: "0xTouYan",
    quizzes: [
      {
        question: "Which country is 0xTouYan from?",
        option1: "China",
        option2: "UK",
        option3: "Japan",
        option4: "Indonesia",
        answer: 3,
      },
      {
        question: "Which is the origin of the name 0xTouYan?",
        option1: "His favorite curry place",
        option2: "His childhood nickname",
        option3: "His favorite YouTuber",
        option4: "Names of places he first traveled to",
        answer: 1,
      },
      {
        question: "Which crypto books 0xTouYan loves to read",
        option1: "Bitcoin White Paper",
        option2: "The Cryptopians",
        option3: "Read Write Own",
        option4: "The Network State",
        answer: 4,
      },
    ],
  },
};
