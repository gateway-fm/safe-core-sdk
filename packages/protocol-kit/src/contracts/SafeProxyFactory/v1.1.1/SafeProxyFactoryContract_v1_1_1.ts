import SafeProxyFactoryBaseContract from '@gateway-fm/protocol-kit/contracts/SafeProxyFactory/SafeProxyFactoryBaseContract'
import SafeProvider from '@gateway-fm/protocol-kit/SafeProvider'
import { DeploymentType } from '@gateway-fm/protocol-kit/types'
import {
  SafeProxyFactoryContract_v1_1_1_Abi,
  SafeProxyFactoryContract_v1_1_1_Contract,
  SafeProxyFactoryContract_v1_1_1_Function,
  safeProxyFactory_1_1_1_ContractArtifacts
} from '@safe-global/types-kit'

/**
 * SafeProxyFactoryContract_v1_1_1  is the implementation specific to the Safe Proxy Factory contract version 1.1.1.
 *
 * This class specializes in handling interactions with the Safe Proxy Factory contract version 1.1.1 using Ethers.js v6.
 *
 * @extends SafeProxyFactoryBaseContract<SafeProxyFactoryContract_v1_1_1_Abi> - Inherits from SafeProxyFactoryBaseContract with ABI specific to Safe Proxy Factory contract version 1.1.1.
 * @implements SafeProxyFactoryContract_v1_1_1_Contract - Implements the interface specific to Safe Proxy Factory contract version 1.1.1.
 */
class SafeProxyFactoryContract_v1_1_1
  extends SafeProxyFactoryBaseContract<SafeProxyFactoryContract_v1_1_1_Abi>
  implements SafeProxyFactoryContract_v1_1_1_Contract
{
  /**
   * Constructs an instance of SafeProxyFactoryContract_v1_1_1
   *
   * @param chainId - The chain ID where the contract resides.
   * @param safeProvider - An instance of SafeProvider.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the Safe deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.1.1 is used.
   * @param deploymentType - Optional deployment type for the contract. If not provided, the first deployment retrieved from the safe-deployments array will be used.
   */
  constructor(
    chainId: bigint,
    safeProvider: SafeProvider,
    customContractAddress?: string,
    customContractAbi?: SafeProxyFactoryContract_v1_1_1_Abi,
    deploymentType?: DeploymentType
  ) {
    const safeVersion = '1.1.1'
    const defaultAbi = safeProxyFactory_1_1_1_ContractArtifacts.abi

    super(
      chainId,
      safeProvider,
      defaultAbi,
      safeVersion,
      customContractAddress,
      customContractAbi,
      deploymentType
    )
  }

  /**
   * Allows to retrieve the creation code used for the Proxy deployment. With this it is easily possible to calculate predicted address.
   * @returns Array[creationCode]
   */
  proxyCreationCode: SafeProxyFactoryContract_v1_1_1_Function<'proxyCreationCode'> = async () => {
    return [await this.read('proxyCreationCode')]
  }

  /**
   * Allows to retrieve the runtime code of a deployed Proxy. This can be used to check that the expected Proxy was deployed.
   * @returns Array[runtimeCode]
   */
  proxyRuntimeCode: SafeProxyFactoryContract_v1_1_1_Function<'proxyRuntimeCode'> = async () => {
    return [await this.read('proxyRuntimeCode')]
  }

  /**
   * Allows to get the address for a new proxy contact created via `createProxyWithNonce`.
   * @param args - Array[masterCopy, initializer, saltNonceBigInt]
   * @returns Array[proxyAddress]
   */
  calculateCreateProxyWithNonceAddress: SafeProxyFactoryContract_v1_1_1_Function<'calculateCreateProxyWithNonceAddress'> =
    async (args) => {
      return [await this.write('calculateCreateProxyWithNonceAddress', args)]
    }

  /**
   * Allows to create new proxy contact and execute a message call to the new proxy within one transaction.
   * @param args - Array[masterCopy, data]
   * @returns Array[proxyAddress]
   */
  createProxy: SafeProxyFactoryContract_v1_1_1_Function<'createProxy'> = async (args) => {
    return [await this.write('createProxy', args)]
  }

  /**
   * Allows to create new proxy contract, execute a message call to the new proxy and call a specified callback within one transaction.
   * @param args - Array[masterCopy, initializer, saltNonce, callback]
   * @returns Array[proxyAddress]
   */
  createProxyWithCallback: SafeProxyFactoryContract_v1_1_1_Function<'createProxyWithCallback'> =
    async (args) => {
      return [await this.write('createProxyWithCallback', args)]
    }

  /**
   * Allows to create new proxy contract and execute a message call to the new proxy within one transaction.
   * @param args - Array[masterCopy, initializer, saltNonce]
   * @returns Array[proxyAddress]
   */
  createProxyWithNonce: SafeProxyFactoryContract_v1_1_1_Function<'createProxyWithNonce'> = async (
    args
  ) => {
    return [await this.write('createProxyWithNonce', args)]
  }
}

export default SafeProxyFactoryContract_v1_1_1
