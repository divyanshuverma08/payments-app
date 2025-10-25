import { Card } from "@repo/ui/Card";

export const Transfers = ({
  transactions, type
}: {
  transactions: {
    id: number;
    timestamp: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    fromUserId: number;
    toUserId: number
  }[];
  type: string
}) => {
  if (!transactions.length) {
    return (
      <Card title={`${type} Money`}>
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title={`${type} Money`}>
      <div className="pt-2">
        {transactions.map((t, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <div className="text-sm">{type} INR</div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {type === "Sent" ? "-" : "+"} Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
