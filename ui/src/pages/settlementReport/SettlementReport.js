import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerState, getSettlementContracts } from "../../context/LedgerContext";

export default function SettlementReport() {
  const ledger = useLedgerState();
  const transfers = getSettlementContracts(ledger, "Main", "SettlementTrades");
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

