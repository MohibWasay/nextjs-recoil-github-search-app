import { client } from "@/clients/octokit";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const users = await client.rest.search.users({
      q: req.query.query as string,
    });
    return res.json(users);
  } catch (error) {
    throw new Error("Failed to query users!");
  }
};

export default handler;
