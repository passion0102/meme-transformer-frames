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

  const isPreviousCorrect =
    state.step != 0
      ? quizzes[id]?.quizzes[state.step - 1]?.answer == state.answer
      : true;

  const isLast = quizzes[id]?.quizzes.length == state.step;

  const inter = await fetch(`${baseUrl}/Inter-Bold.ttf`);
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
                weight: 700,
                style: "normal",
              },
            ],
          }}
        >
          {state.step == 0 ? (
            <div tw="flex relative w-full h-full bg-purple-800 font-sans font-bold">
              <div tw="flex flex-col absolute top-0 bottom-0 right-0 left-0 w-full h-full p-8 text-white justify-center">
                <div tw="flex w-full items-center justify-center text-center text-4xl">
                  MEME Transformer
                </div>
                <div tw="flex w-full text-center text-xl mt-8">
                  Transform your PFP into an awesome crypto meme
                </div>
                <div tw="flex justify-center items-center mt-5">
                  <div tw=" flex p-2 border-4 border-purple-600">
                    <img
                      style={{ objectFit: "cover" }}
                      alt="bg"
                      tw="w-32 h-32"
                      src={`${baseUrl}/no_glasses.jpg`}
                    />
                  </div>
                  <div tw="flex mx-5 text-6xl font-bold">→</div>
                  <div tw="flex p-2 border-4 border-purple-600">
                    <img
                      style={{ objectFit: "cover" }}
                      alt="bg"
                      tw="w-32 h-32"
                      src={`${baseUrl}/with_glasses.jpeg`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div tw="flex relative w-full h-full bg-purple-800 font-sans font-bold justify-center items-center">
              <div tw="flex relative w-70 h-70">
                <img
                  style={{ objectFit: "cover" }}
                  alt="face"
                  tw="w-full h-full"
                  src={`${baseUrl}/no_glasses.jpg`}
                />
                <img
                  alt="nouns-sunglass"
                  tw="absolute top-1/3 left-1/3 w-30"
                  src={`${baseUrl}/nouns-sunglass.png`}
                />
              </div>
            </div>
          )}
        </FrameImage>

        {state.step == 0 ? <FrameButton>Generate meme PFP</FrameButton> : null}

        {state.step == 1 ? <FrameButton>Left</FrameButton> : null}
        {state.step == 1 ? <FrameButton>Right</FrameButton> : null}
        {state.step == 1 ? <FrameButton>Next</FrameButton> : null}

        {state.step == 2 ? <FrameButton>Up</FrameButton> : null}
        {state.step == 2 ? <FrameButton>Down</FrameButton> : null}
        {state.step == 2 ? (
          <FrameButton action="link" target="https://#">
            Link to download
          </FrameButton>
        ) : null}
      </FrameContainer>
    </div>
  );
}
