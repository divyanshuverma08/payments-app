import { SendCard } from "../../../components/SendCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { Transfers } from "../../../components/Transfers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.user.findFirst({
    where: {
      id: Number(session?.user?.id)
    },
    select: {
        sentTransfers: true,
        receivedTransfers: true
    }
  });
  
  return txns;
}

export default async function SendCardPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions(); 
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <Transfers type={"Sent"} transactions={transactions?.sentTransfers|| []} />
            <Transfers type={"Received"} transactions={transactions?.receivedTransfers|| []} />
          </div>
        </div>
      </div>
    </div>
  );
}
