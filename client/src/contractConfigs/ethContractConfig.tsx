import { UseContractConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContract";
import config from "../contractConfigs/ethContractConfig.json";

const ethContractConfig: UseContractConfig = {
  addressOrName: config.address,
  contractInterface: config.abi,
};

export default ethContractConfig;
