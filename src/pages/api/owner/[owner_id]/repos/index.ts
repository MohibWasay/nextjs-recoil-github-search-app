import { client } from "@/clients/octokit";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { owner_id: username } = req.query;
  try {
    const repos = await client.rest.repos.listForUser({
      username: username as string,
    });

    return res.json(repos.data);
  } catch (error) {
    throw new Error(`Failed to list repositories for ${req.query.username}!`);
  }
};

export default handler;
