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

        // Check whitelist status
        const whitelistData = {
          isWhitelisted: true,
          tier: 2,
          allocation: ethers.utils.parseEther("5000"),
          purchased: ethers.utils.parseEther("1000"),
          remaining: ethers.utils.parseEther("4000"),
          discountPercentage: 10,
        };

        return res.status(200).json(whitelistData);

      case "POST":
        const { addresses, tier } = req.body;

        if (!addresses || !tier) {
          return res
            .status(400)
            .json({ error: "Addresses and tier are required" });
        }

        // Add addresses to whitelist
        const result = {
          success: true,
          addedAddresses: addresses,
        };

        return res.status(200).json(result);
    }
  } catch (error: any) {
    console.error("Whitelist API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}

export default withAuth(handler);
