import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { withAuth } from "../../middleware/withAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    switch (req.method) {
      case "GET":
        const { address } = req.query;

        if (!address) {
          return res.status(400).json({ error: "Address is required" });
        }

        // Get distribution data
        const distributionData = {
          totalDistributed: ethers.utils.parseEther("1000000"),
          userClaims: ethers.utils.parseEther("1000"),
          claimable: ethers.utils.parseEther("500"),
          hasAirdrop: true,
          stakingApr: 12.5,
          pendingRewards: ethers.utils.parseEther("50"),
        };

        return res.status(200).json(distributionData);

      case "POST":
        const { type, proof } = req.body;

        if (!type || !proof) {
          return res.status(400).json({ error: "Type and proof are required" });
        }

        // Process claim
        const claimResult = {
          success: true,
          transactionHash: "0x...",
          amount: ethers.utils.parseEther("500"),
        };

        return res.status(200).json(claimResult);
    }
  } catch (error: any) {
    console.error("Distribution API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}

export default withAuth(handler);
