import { client } from "@/clients/octokit";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await client.rest.search.users({
      q: query as string,
    });
    return res.json(users.data);
  } catch (error) {
    throw new Error("Failed to query users!");
  }
};

export default handler;
