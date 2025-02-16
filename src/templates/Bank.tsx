import { getCurrDate } from "../functions/getCurrDate";
import { date2text } from "../functions/date2text";
import { useEffect, useState } from "react";
import { SITE_DOMAIN } from "../config";

const Bank = ({ table, total }: BankProps) => {
  const [input, setInput] = useState<string>("");
  const [localTotal, setLocalTotal] = useState<number>(0);
  const [localTable, setLocalTable] = useState<TableList>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);

  // upade the local table on mount
  useEffect(() => {
    setLocalTable(table);
    setLocalTotal(total);
  }, [table, total]);

  // localTotal and localTable when component mounts
  const handleClearInput = () => {
    setInput("");
  };

  const handleAddTotal = async () => {
    try {
      setIsLoading(true);

      const newVal = localTotal + Number(input) ;

      // add new total item to database
      const res = await fetch(`${SITE_DOMAIN}/api/tabletotal`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ value: newVal }),
      });

      const newTotal: number = await res.json();

      // add new total to local UI version.
      setLocalTotal(newTotal);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }

    setInput("");
  };

  const handleClearTotal = async () => {
    try {
      setIsLoading(true);

      await fetch(`${SITE_DOMAIN}/api/tabletotal`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ value: 0 }),
      });

      setLocalTotal(0);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handleAddData = async () => {
    if (localTotal == 0) return;

    try {
      setIsLoading(true);
      // add new localTable item to database
      // requires (value number and date string)
      const tableItem = await fetch(`${SITE_DOMAIN}/api/table`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          value: localTotal,
          date: getCurrDate(),
        }),
      });
      const newItem: TableItem = await tableItem.json();
      //   const newItem: TableItem = item.data;

      // add new comment to local UI version of localTable.
      setLocalTable((localTable) => [newItem, ...localTable]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }

    // clear the current total also
    await handleClearTotal();
  };

  const handleClearData = async (_id: string) => {
    try {
      setIsLoading(true);
      // add new localTable item to database
      // requires (value number and date string)
      await fetch(`${SITE_DOMAIN}/api/table`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
        }),
      });

      // delete comment in local UI version of localTable.
      // returns all items except the argument id
      setLocalTable((localTable) =>
        localTable.filter((item) => item._id !== _id)
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="grid grid-cols-2 gap-2 items-start">
        <div className="col-span-2 space-y-2 px-8 flex flex-col border border-secondary p-2">
          <p className="font-bold">Input</p>
          <div className="flex space-x-2">
            <input
              className="w-full m-auto text-primary-light"
              onChange={(e: any) => {
                setInput(e.target.value);
              }}
              value={input}
              type="number"
            />
            <div
              onClick={handleClearInput}
              className="w-full p-2 cursor-pointer flex border text-primary-light border-primary-light dark:border-primary-dark bg-red-100">
              Clear
            </div>
            <div
              onClick={handleAddTotal}
              className="w-full p-2 cursor-pointer flex border text-primary-light border-primary-light dark:border-primary-dark bg-red-100">
              {isLoading ? "loading..." : isError ? "error..." : "Add total"}
            </div>
          </div>
        </div>
        <div className="col-span-2 px-8 space-y-2 flex flex-col border border-secondary p-2">
          <p className="font-bold">Current Total</p>
          <div className="flex space-x-2">
            <input
              className="w-full m-auto text-primary-light font-bold"
              value={localTotal}
              type="number"
              disabled
            />
            <div
              onClick={handleClearTotal}
              className="w-full p-2 cursor-pointer flex border text-primary-light border-primary-light dark:border-primary-dark bg-red-100">
              Clear
            </div>
            <div
              onClick={handleAddData}
              className="w-full p-2 cursor-pointer flex border text-primary-light border-primary-light dark:border-primary-dark bg-red-100">
              {isLoading ? "loading..." : isError ? "error..." : "Add data"}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-secondary px-8 p-2 space-y-2">
        <div className="flex space-x-2 items-center justify-between">
          <p className="font-bold">Value</p>
          <p className="font-bold">Date</p>
          <p className="font-bold">Option</p>
        </div>
        <hr />
        {localTable.map((item) => {
          return (
            <div key={item._id}>
              <div className="flex space-x-2 items-center justify-between py-2">
                <div>{item.value}</div>
                <div>{date2text(item.date)}</div>
                <div
                  onClick={() => handleClearData(item._id)}
                  className="m-auto px-2 cursor-pointer flex items-center border text-primary-light border-primary-light dark:border-primary-dark bg-red-100">
                  Clear
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bank;
