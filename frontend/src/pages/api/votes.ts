import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { withAuth } from "../../middleware/withAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!["GET", "POST", "PUT"].includes(req.method || "")) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    switch (req.method) {
      case "GET":
        const { id } = req.query;

        if (id) {
          // Get specific proposal
          const proposal = {
            id,
            title: "Example Proposal",
            description: "This is an example proposal",
            proposer: "0x...",
            status: "active",
            startBlock: 1000000,
            endBlock: 1100000,
            forVotes: ethers.utils.parseEther("100000"),
            againstVotes: ethers.utils.parseEther("50000"),
            abstainVotes: ethers.utils.parseEther("10000"),
            createdAt: Date.now(),
            actions: [],
          };

          return res.status(200).json(proposal);
        }

        // Get all proposals
        const proposals = [
          // Add mock proposals
        ];

        return res.status(200).json(proposals);

      case "POST":
        const { title, description, actions } = req.body;

        if (!title || !description || !actions) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        // Create new proposal
        const newProposal = {
          id: Date.now().toString(),
          title,
          description,
          actions,
          status: "pending",
          // ... other fields
        };

        return res.status(201).json(newProposal);

      case "PUT":
        const { proposalId, action } = req.body;

        if (!proposalId || !action) {
          return res
            .status(400)
            .json({ error: "ProposalId and action are required" });
        }

        // Process proposal action (queue/execute/cancel)
        const result = {
          success: true,
          transactionHash: "0x...",
        };

        return res.status(200).json(result);
    }
  } catch (error: any) {
    console.error("Proposals API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}

export default withAuth(handler);
