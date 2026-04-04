/**
 * useWallet - Wallet Connection Hook
 *
 * React hook for wallet connection using wagmi v2.
 * Provides account state, connection status, and transaction methods.
 *
 * @example
 * const { account, connect, disconnect, isConnecting } = useWallet();
 *
 * if (!account) {
 *   return <Button onClick={connect}>Connect Wallet</Button>;
 * }
 *
 * return <div>Connected: {account.address}</div>;
 */

import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useCallback, useState } from 'react';
import { Wallet } from 'lucide-react';

interface UseWalletReturn {
  /** Current account address */
  address: string | undefined;
  /** Whether wallet is connected */
  isConnected: boolean;
  /** Whether connection is in progress */
  isConnecting: boolean;
  /** Current chain ID */
  chainId: number | undefined;
  /** Error message if any */
  error: string | undefined;
  /** Connect wallet */
  connect: () => void;
  /** Disconnect wallet */
  disconnect: () => void;
  /** Write contract (send transaction) */
  writeContract: (args: { abi: any; address: string; functionName: string; args?: any[] }) => Promise<void>;
  /** Transaction receipt status */
  isConfirming: boolean;
  /** Transaction hash */
  txHash: string | undefined;
}

/**
 * Wallet connection hook for RWA applications
 *
 * @returns Wallet state and methods
 */
export function useWallet(): UseWalletReturn {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();
  const [txHash, setTxHash] = useState<string | undefined>();
  const [isConfirming, setIsConfirming] = useState(false);

  const { isLoading: isConfirmingReceipt } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  const handleConnect = useCallback(() => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  }, [connectors, connect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setTxHash(undefined);
  }, [disconnect]);

  const handleWriteContract = useCallback(async (args: {
    abi: any;
    address: string;
    functionName: string;
    args?: any[];
  }) => {
    try {
      const hash = await writeContractAsync({
        abi: args.abi,
        address: args.address,
        functionName: args.functionName,
        args: args.args,
      });
      setTxHash(hash);
      setIsConfirming(true);
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }, [writeContractAsync]);

  return {
    address,
    isConnected,
    isConnecting: !isConnected && connectors.length > 0,
    chainId,
    error: undefined,
    connect: handleConnect,
    disconnect: handleDisconnect,
    writeContract: handleWriteContract,
    isConfirming: isConfirmingReceipt,
    txHash,
  };
}

export default useWallet;

/**
 * Usage in RWA Token Form:
 *
 * const { address, connect, writeContract, isConfirming, txHash } = useWallet();
 *
 * const handleMint = async () => {
 *   await writeContract({
 *     abi: tokenAbi,
 *     address: tokenAddress,
 *     functionName: 'mint',
 *     args: [recipientAddress, amount],
 *   });
 * };
 *
 * // Show transaction status
 * {isConfirming && <div>Confirming transaction...</div>}
 * {txHash && <div>Transaction confirmed: {txHash}</div>}
 */