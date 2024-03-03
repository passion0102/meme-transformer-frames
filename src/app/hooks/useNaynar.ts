import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export const useNaynar = () => {
  const API_KEY = process.env.NAYNAR_API_KEY || "";

  const fetchUserPFP = async (messageHashInHex: string) => {
    const naynarClient = new NeynarAPIClient(API_KEY);
    const response = await naynarClient.validateFrameAction(messageHashInHex);

    return response.interactor?.pfp_url;
  };

  return { fetchUserPFP };
};
