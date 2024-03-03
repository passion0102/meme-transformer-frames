type Movement = {
  option1: string;
  option2: string;
  option3: string;
  option4?: string;
};

type Movements = {
  [id: string]: { actions: Movement[]; iconURL: string; name: string };
};

export const movements: Movements = {
  nouns: {
    iconURL:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/qk/5b1e17d6-3c78-4186-b3ec-464a8255909f",
    name: "Nouns Meme",
    actions: [
      {
        option1: "👈",
        option2: "👉",
        option3: "Proceed",
      },
      {
        option1: "👆",
        option2: "👇",
        option3: "Retry",
        option4: "Download",
      },
    ],
  },
};
