import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerState, getContracts } from "../../context/LedgerContext";

export default function ErrorTrans() {
  const ledger = useLedgerState();
  const transfers = getContracts(ledger, "Main", "DeadUC2");

  return (
    <>
      <Contracts
        contracts={transfers}
        columns={[
          ["ContractId", "contractId"],
          ["Identifier", "argument.executionKey"],
          ["Client", "argument.client"],
          ["Amount", "argument.tradeAmount"],
          ["Ccy", "argument.currency"],
          ["TradeType", "argument.tradeType"],
          ["Stage", "argument.tradeStage"],
        ]}
        
          actions={[]}
        
      />
    </>
  );

}

