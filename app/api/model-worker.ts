const axios = require("axios");

// Function to make an API call using axios
async function runQuery(query: string): Promise<any> {
  const endpoint =
    "https://gateway-arbitrum.network.thegraph.com/api/829116bfdd9d51f6394344cac20289b0/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum";
  try {
    const response = await axios.post(endpoint, { query: query });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Query failed. Return code is ${response.status}. ${query}`
      );
    }
  } catch (error: any) {
    throw new Error(`Query failed. ${error.message}`);
  }
}

// Function to switch tokens if token0 has more transactions
function switchToken(pair: any): void {
  if (parseInt(pair.token0.txCount) > parseInt(pair.token1.txCount)) {
    [pair.reserve00, pair.reserve11] = [pair.reserve1, pair.reserve0];
    [pair.token00, pair.token11] = [pair.token1, pair.token0];
  } else {
    [pair.reserve00, pair.reserve11] = [pair.reserve0, pair.reserve1];
    [pair.token00, pair.token11] = [pair.token0, pair.token1];
  }
}

// Function to get pair info for a given token address with token1 always being WETH
async function getPairInfo(tokenAddress: string): Promise<any> {
  const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // WETH address on Arbitrum
  const query = `
  {
      pairs(where: {token0: "${tokenAddress}", token1: "${WETH_ADDRESS}"}) {
        id
        token0{
          id
          symbol
          name
          txCount
          totalLiquidity
        }
        token1{
          id
          symbol
          name
          txCount
          totalLiquidity
        }
        reserve0
        reserve1
        totalSupply
        reserveUSD
        reserveETH
        txCount
        createdAtTimestamp
        createdAtBlockNumber
      }
    }
  `;
  return await runQuery(query);
}

// Function to get holder information
async function getHolders(pairId: string): Promise<any> {
  const queryTemplate = `
    {
      liquidityPositions(where: {pair: "pair_id"}, orderBy: liquidityTokenBalance, orderDirection: desc) {
        user {
          id
        }
        liquidityTokenBalance
      }
    }
  `;
  const query = queryTemplate.replace("pair_id", pairId);
  return await runQuery(query);
}

// Example usage
(async () => {
  try {
    const tokenAddress = "0x8115def7d6ab9ab41ef618febcccf26ee9a54e8b";
    const pairInfo = await getPairInfo(tokenAddress);
    console.dir(pairInfo);
  } catch (error: any) {
    console.error(error.message);
  }
})();
