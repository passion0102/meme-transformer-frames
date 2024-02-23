import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from "frames.js/next/server";
import { DEBUG_HUB_OPTIONS } from "../debug/constants";
import { quizzes } from "../quizzes";
import {
  FrameActionDataParsedAndHubContext,
  getUserDataForFid,
} from "frames.js";

type FrameState = {
  answer: number;
  step: number;
};

const initialState: FrameState = {
  answer: 0,
  step: 0,
};

const reducer: FrameReducer<FrameState> = (state, action) => {
  return {
    answer: action.postBody?.untrustedData.buttonIndex
      ? action.postBody?.untrustedData.buttonIndex
      : 0,
    step: state.step + 1,
  };
};

type Params = { id: "string" };

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const id = (params as unknown as Params).id;

  const previousFrame = getPreviousFrame<FrameState>(searchParams);

  const [state, dispatch] = useFramesReducer<FrameState>(
    reducer,
    initialState,
    previousFrame
  );

  const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

  const quiz = quizzes[id]?.quizzes[state.step];
  const isPreviousCorrect =
    state.step != 0
      ? quizzes[id]?.quizzes[state.step - 1]?.answer == state.answer
      : true;

  const isLast = quizzes[id]?.quizzes.length == state.step;

  const inter = await fetch(`${baseUrl}/Inter-Regular.ttf`);
  const interBuffer = await inter.arrayBuffer();

  let frameMessage: FrameActionDataParsedAndHubContext | null = null;
  if (isLast) {
    frameMessage = await getFrameMessage(previousFrame.postBody, {
      ...DEBUG_HUB_OPTIONS,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-8"></div>

      <FrameContainer
        postUrl={`${baseUrl}/${id}/frames`}
        state={isPreviousCorrect ? state : { answer: 0, step: -1 }}
        // previousFrame={isPreviousCorrect ? previousFrame : initialState}
        previousFrame={previousFrame}
        pathname={`/${id}`}
      >
        <FrameImage
          aspectRatio="1:1"
          options={{
            width: 500,
            height: 500,
            fonts: [
              {
                name: "Inter",
                data: interBuffer,
                weight: 400,
                style: "normal",
              },
            ],
          }}
        >
          {isPreviousCorrect ? (
            isLast ? (
              <div tw="flex relative w-full h-full bg-black">
                <img
                  style={{ objectFit: "cover" }}
                  alt="bg"
                  tw="absolute w-full h-full"
                  src={`${baseUrl}/background.png`}
                />
                <div tw="flex flex-col absolute top-0 bottom-0 right-0 left-0 w-full h-full p-8 text-white justify-center">
                  <img
                    style={{ objectFit: "cover" }}
                    alt="bg"
                    tw="w-40 h-40 rounded-full mx-auto mb-10"
                    src={quizzes[id]?.iconURL}
                  />
                  <div tw="flex w-full text-center text-4xl">
                    {`Congratulations! You(${frameMessage?.requesterUserData?.displayName}) are a big fan of ${quizzes[id]?.name}!`}
                  </div>
                </div>
              </div>
            ) : (
              <div tw="flex relative w-full h-full bg-black">
                <img
                  style={{ objectFit: "cover" }}
                  alt="bg"
                  tw="absolute w-full h-full"
                  src={`${baseUrl}/background.png`}
                />

                <div tw="flex flex-col absolute top-0 bottom-0 right-0 left-0 w-full h-full p-8 text-white">
                  <div tw="flex justify-between w-full">
                    <img
                      style={{ objectFit: "cover" }}
                      alt="bg"
                      tw="w-[200px] mb-6"
                      src={`${baseUrl}/logo.png`}
                    />
                    <img
                      style={{ objectFit: "cover" }}
                      alt="bg"
                      tw="w-10 h-10 rounded-full"
                      src={quizzes[id]?.iconURL}
                    />
                  </div>

                  <div tw="w-full text-xl flex mb-6">
                    Q{state.step + 1}: {quiz?.question}
                  </div>
                  <div tw="flex flex-col">
                    {quiz?.option1 && (
                      <div tw="flex mb-3 bg-black w-full text-xl border border-2 border-white rounded-xl py-3 px-2">
                        A: {quiz?.option1}
                      </div>
                    )}
                    {quiz?.option2 && (
                      <div tw="flex mb-3 bg-black w-full text-xl border border-2 border-white rounded-xl py-3 px-2">
                        B: {quiz?.option2}
                      </div>
                    )}
                    {quiz?.option3 && (
                      <div tw="flex mb-3 bg-black w-full text-xl border border-2 border-white rounded-xl py-3 px-2">
                        C: {quiz?.option3}
                      </div>
                    )}
                    {quiz?.option4 && (
                      <div tw="flex mb-3 bg-black w-full text-xl border border-2 border-white rounded-xl py-3 px-2">
                        D: {quiz?.option4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div tw="flex relative w-full h-full bg-black">
              <img
                style={{ objectFit: "cover" }}
                alt="bg"
                tw="absolute w-full h-full"
                src={`${baseUrl}/background.png`}
              />
              <div tw="flex flex-col absolute top-0 bottom-0 right-0 left-0 w-full h-full p-8 text-white justify-center">
                <img
                  style={{ objectFit: "cover" }}
                  alt="bg"
                  tw="w-40 h-40 rounded-full mx-auto mb-10"
                  src={quizzes[id]?.iconURL}
                />
                <div tw="flex w-full text-center text-4xl">
                  You chose the wrong answer 😭😭😭
                </div>
              </div>
            </div>
          )}

          {/* <div tw="absolute bottom-0 w-full flex justify-center items-center text-8xl px-20 pb-8 pt-4 bg-black/50 text-white text-wrap text-center">
              {"This is test quiz"}
            </div> */}
          {/* </div> */}
        </FrameImage>

        {!!quiz?.option1 && isPreviousCorrect ? (
          <FrameButton>A</FrameButton>
        ) : null}
        {!!quiz?.option2 && isPreviousCorrect ? (
          <FrameButton>B</FrameButton>
        ) : null}
        {!!quiz?.option3 && isPreviousCorrect ? (
          <FrameButton>C</FrameButton>
        ) : null}
        {!!quiz?.option4 && isPreviousCorrect ? (
          <FrameButton>D</FrameButton>
        ) : null}

        {!isPreviousCorrect ? <FrameButton>Try again!</FrameButton> : null}

        {isLast ? (
          <FrameButton action="link" target="https://warpcast.com/triviatech">
            Follow @triviatech and wait for the game release!
          </FrameButton>
        ) : null}
      </FrameContainer>
    </div>
  );
}
