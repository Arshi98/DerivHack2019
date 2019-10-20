import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerState, getTradeContracts } from "../../context/LedgerContext";

export default function TradedReport() {
  const ledger = useLedgerState();
  const transfers = getTradeContracts(ledger, "Main", ["SettlementTrades", "UC2"]);

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

