import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerDispatch, useLedgerState, getContracts, sendCommand, fetchContracts } from "../../context/LedgerContext";
import { useUserState } from "../../context/UserContext";

export default function Report() {

  const user = useUserState();
  const ledger = useLedgerState();
  const ledgerDispatch = useLedgerDispatch();
  const transfers = getContracts(ledger);
  const allocateUsers = ["Broker1", "Broker2"];
  const affirmUsers = ["Client1", "Client2", "Client3", "Client4", "Client5", "Client6", "Client7", "Client8", "Client9", "Client10"];

  const allocate = async (c) => {
    var command;
    console.log(c.argument.tradeStage);
    if (c.argument.tradeStage === "Allocation") {
      if (affirmUsers.indexOf(user.user) < 0) {
        console.log("Invalid user["+user.user+"] to execute the contract. Please contact your administrator.");
        return;
      }
      command = {
        templateId: { moduleName: "Main", entityName: "AllocatedTrades" },
        contractId: c.contractId,
        choice: "AffirmTrade",
        argument:{"affirm":"true"},
        meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});

    } else if (c.argument.tradeStage === "Execution") {
      if (allocateUsers.indexOf(user.user) < 0) {
        console.log("Invalid user["+user.user+"] to execute the contract. Please contact your administrator.")
        return;
      }
      // console.log(c.argument.event.primitive.allocation[0].after.allocatedTrade[0].execution.quantity.amount)
      // console.log(c.argument.event.primitive.allocation[0].after.allocatedTrade[1].execution.quantity.amount)
    
      command = {
        templateId: { moduleName: "Main", entityName: "UC2" },
        contractId: c.contractId,
        choice: "SplitAndAllocateTrade1",
        argument:{
                    "allocation1":c.argument.event.primitive.allocation[0].after.allocatedTrade[0].execution.settlementTerms.settlementAmount.amount, 
                    "allocation2":c.argument.event.primitive.allocation[0].after.allocatedTrade[1].execution.settlementTerms.settlementAmount.amount, 
                    "newTradeAmount": c.argument.event.primitive.allocation[0].after.allocatedTrade[0].execution.settlementTerms.settlementAmount.amount, 
                    "tradeStage": "Allocation",
                    "description": "Allocation1"
                  },
        meta: { ledgerEffectiveTime: 0 }
    };

    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});

    command = {
      templateId: { moduleName: "Main", entityName: "UC2" },
      contractId: c.contractId,
      choice: "SplitAndAllocateTrade2",
      argument:{
                  "allocation1":c.argument.event.primitive.allocation[0].after.allocatedTrade[0].execution.settlementTerms.settlementAmount.amount, 
                  "allocation2":c.argument.event.primitive.allocation[0].after.allocatedTrade[1].execution.settlementTerms.settlementAmount.amount, 
                  "newTradeAmount":c.argument.event.primitive.allocation[0].after.allocatedTrade[1].execution.settlementTerms.settlementAmount.amount, 
                  "tradeStage": "Allocation",
                  "description": "Allocation2"
                },
      meta: { ledgerEffectiveTime: 0 }
  };
  
  await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});

  command = {
    templateId: { moduleName: "Main", entityName: "UC2" },
    contractId: c.contractId,
    choice: "RemoveOriginalTrade",
    argument:{},
    meta: { ledgerEffectiveTime: 0 }
  };

  await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});

  } else if (c.argument.tradeStage === "Affirm") {
      // Confirmation
      if (allocateUsers.indexOf(user.user) < 0) {
        console.log("Invalid user["+user.user+"] to execute the contract. Please contact your administrator.");
        return;
      }
      command = {
        templateId: { moduleName: "Main", entityName: "AffirmTrades" },
        contractId: c.contractId,
        choice: "ConfirmTrade",
        argument:{"confirm":"true"},
        meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
  } else if (c.argument.tradeStage === "Confirm") {
      // Settlement
      if (allocateUsers.indexOf(user.user) < 0) {
        console.log("Invalid user["+user.user+"] to execute the contract. Please contact your administrator.");
        return;
      }

      // let event = c.argument.event;
      // event. 
      command = {
        templateId: { moduleName: "Main", entityName: "ConfirmTrades" },
        contractId: c.contractId,
        choice: "StartSettlement",
        argument:{"newEvent":c.argument.event},
        meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
  } else if (c.argument.tradeStage === "Settlement") {
    // Settlement
    if (affirmUsers.indexOf(user.user) < 0) {
      console.log("Invalid user["+user.user+"] to execute the contract. Please contact your administrator.");
      return;
    }

    // let event = c.argument.event;
    // event. 
    command = {
      templateId: { moduleName: "Main", entityName: "SettlementTrades" },
      contractId: c.contractId,
      choice: "ColletralMyShare",
      argument:{"locker":"thirdParty"},
      meta: { ledgerEffectiveTime: 0 }
  };
  await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {}); 
} else if (c.argument.tradeStage === "ColletralLocked") {
  // Settlement
  if (affirmUsers.indexOf(user.user) < 0) {
    console.log("Invalid user["+user.user+"] to execute the contract. Please contact your administrator.");
    return;
  }

  // let event = c.argument.event;
  // event. 
  command = {
    templateId: { moduleName: "Main", entityName: "ColletralTrade" },
    contractId: c.contractId,
    choice: "Unlock",
    argument:{"locker":"thirdParty"},
    meta: { ledgerEffectiveTime: 0 }
  };
  await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {}); 
  } else {
    console.log("Invalid excercise [ "+c.argument.tradeStage+" ]. Please contact your administrator.")
    return;
  }
    // await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
    await fetchContracts(ledgerDispatch, user.token, () => {}, () => {});
  }

  // if(user.user === "Client1" || user.user === "Client2" || user.user === "Client3"  || user.user === "Broker1"  || user.user === "Broker2") {
    if( user.user === "Client1" || user.user === "Client2" || user.user === "Client3"  || user.user === "Broker1"  || user.user === "Broker2" ) {
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
              
                actions={[["Allocate Trade", allocate]]}
              
            />
          </>
        );
  } else {
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
          
        />
      </>
    );
  }
}

