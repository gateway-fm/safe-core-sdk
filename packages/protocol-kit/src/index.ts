import Safe from './Safe'
import SafeProvider from './SafeProvider'
import {
  CreateCallBaseContract,
  MultiSendBaseContract,
  MultiSendCallOnlyBaseContract,
  SafeBaseContract,
  SafeProxyFactoryBaseContract,
  SignMessageLibBaseContract
} from './contracts'
import { DEFAULT_SAFE_VERSION } from './contracts/config'
import {
  getCompatibilityFallbackHandlerContract,
  getCreateCallContract,
  getMultiSendCallOnlyContract,
  getMultiSendContract,
  getSafeProxyFactoryContract,
  getSafeContract,
  getSignMessageLibContract,
  getSafeWebAuthnSignerFactoryContract,
  getSafeWebAuthnSharedSignerContract,
  getSimulateTxAccessorContract
} from './contracts/safeDeploymentContracts'
import {
  PREDETERMINED_SALT_NONCE,
  encodeCreateProxyWithNonce,
  encodeSetupCallData,
  predictSafeAddress,
  getPredictedSafeAddressInitCode,
  getSafeAddressFromDeploymentTx
} from './contracts/utils'
import ContractManager from './managers/contractManager'
import {
  EthSafeSignature,
  estimateTxBaseGas,
  estimateTxGas,
  estimateSafeTxGas,
  estimateSafeDeploymentGas,
  extractPasskeyData,
  validateEthereumAddress,
  validateEip3770Address,
  decodeMultiSendData,
  generatePreValidatedSignature,
  isSafeMultisigTransactionResponse
} from './utils'
import EthSafeTransaction from './utils/transactions/SafeTransaction'
import EthSafeMessage from './utils/messages/SafeMessage'
import { SafeTransactionOptionalProps } from './utils/transactions/types'
import { encodeMultiSendData, standardizeSafeTransactionData } from './utils/transactions/utils'
import {
  getERC20Decimals,
  isGasTokenCompatibleWithHandlePayment,
  createERC20TokenTransferTransaction
} from './utils/erc-20'

import {
  generateSignature,
  generateEIP712Signature,
  buildContractSignature,
  buildSignatureBytes,
  preimageSafeTransactionHash,
  preimageSafeMessageHash
} from './utils/signatures/utils'

import {
  getEip712TxTypes,
  getEip712MessageTypes,
  hashSafeMessage,
  generateTypedData
} from './utils/eip-712'
import { createPasskeyClient } from './utils/passkeys/PasskeyClient'
import getPasskeyOwnerAddress from './utils/passkeys/getPasskeyOwnerAddress'
import generateOnChainIdentifier from './utils/on-chain-tracking/generateOnChainIdentifier'

// Import directly from source modules for re-export
import { ZERO_ADDRESS, EMPTY_DATA, SENTINEL_ADDRESS } from './utils/constants'
import { adjustVInSignature } from './utils/signatures'
import { hasSafeFeature, SAFE_FEATURES } from './utils/safeVersions'
import { sameString } from './utils/address'
import { networks } from './utils/eip-3770/config'
import {
  getCompatibilityFallbackHandlerContractInstance,
  getMultiSendCallOnlyContractInstance,
  getSafeContractInstance,
  getSafeProxyFactoryContractInstance,
  getSignMessageLibContractInstance
} from './contracts/contractInstances'

export {
  estimateTxBaseGas,
  estimateTxGas,
  estimateSafeTxGas,
  estimateSafeDeploymentGas,
  extractPasskeyData,
  ContractManager,
  CreateCallBaseContract,
  createERC20TokenTransferTransaction,
  DEFAULT_SAFE_VERSION,
  EthSafeSignature,
  MultiSendCallOnlyBaseContract,
  MultiSendBaseContract,
  generateOnChainIdentifier,
  PREDETERMINED_SALT_NONCE,
  SafeBaseContract,
  SafeProxyFactoryBaseContract,
  SafeTransactionOptionalProps,
  SignMessageLibBaseContract,
  encodeCreateProxyWithNonce,
  encodeMultiSendData,
  encodeSetupCallData,
  getCompatibilityFallbackHandlerContract,
  getCreateCallContract,
  getERC20Decimals,
  getMultiSendCallOnlyContract,
  getMultiSendContract,
  getSafeProxyFactoryContract,
  getSafeContract,
  getSignMessageLibContract,
  getSafeWebAuthnSignerFactoryContract,
  getSafeWebAuthnSharedSignerContract,
  isGasTokenCompatibleWithHandlePayment,
  predictSafeAddress,
  getPredictedSafeAddressInitCode,
  standardizeSafeTransactionData,
  validateEip3770Address,
  validateEthereumAddress,
  generateSignature,
  generateEIP712Signature,
  buildContractSignature,
  buildSignatureBytes,
  preimageSafeTransactionHash,
  preimageSafeMessageHash,
  getEip712TxTypes,
  getEip712MessageTypes,
  getSafeAddressFromDeploymentTx,
  hashSafeMessage,
  generateTypedData,
  SafeProvider,
  createPasskeyClient,
  EthSafeTransaction,
  EthSafeMessage,
  getPasskeyOwnerAddress,
  ZERO_ADDRESS,
  EMPTY_DATA,
  SENTINEL_ADDRESS,
  adjustVInSignature,
  hasSafeFeature,
  SAFE_FEATURES,
  generatePreValidatedSignature,
  isSafeMultisigTransactionResponse,
  decodeMultiSendData,
  getCompatibilityFallbackHandlerContractInstance,
  getMultiSendCallOnlyContractInstance,
  getSafeContractInstance,
  getSafeProxyFactoryContractInstance,
  getSignMessageLibContractInstance,
  sameString,
  networks,
  getSimulateTxAccessorContract
}

export * from './types'
export * from './utils/constants'
export * from './utils/safeVersions'
export * from './utils/signatures'
export * from './contracts/Safe/SafeBaseContract'

export { SigningMethod } from '@safe-global/types-kit'

export interface DeploySafeProps {
  safeAccountConfig: {
    owners: string[]
    threshold: number
    to?: string
    data?: string
    fallbackHandler?: string
    paymentToken?: string
    payment?: string
    paymentReceiver?: string
  }
  saltNonce: string | number
  options?: {
    gasLimit?: string
    gasPrice?: string
    maxFeePerGas?: string
    maxPriorityFeePerGas?: string
  }
  callback?: (txHash: string) => void
}

export interface PredictedSafeProps {
  safeAccountConfig: {
    owners: string[]
    threshold: number
    to?: string
    data?: string
    fallbackHandler?: string
    paymentToken?: string
    payment?: string
    paymentReceiver?: string
  }
  safeDeploymentConfig: {
    saltNonce: string | number
    safeVersion: string
  }
}

export { EthSafeTransaction as SafeTransaction, Safe as SafeFactory }

export default Safe

declare module 'abitype' {
  export interface Register {
    AddressType: string
  }
}
