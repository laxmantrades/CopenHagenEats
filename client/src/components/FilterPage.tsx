import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useResturantStore } from "@/store/useResturantStore";

export interface IFilterOptions {
  id: string;
  label: string;
}

const filterOptions: IFilterOptions[] = [
  { id: "burger", label: "Burger" },
  { id: "pizza", label: "Pizza" },
  { id: "momos", label: "Momo" },
  { id: "biryani", label: "Biryani" },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useResturantStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };
  return (
    <div className="md:w-60">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Filter by cuisines</h1>
        <Button onClick={resetAppliedFilter} variant="link">Reset</Button>
      </div>
      <div>
        {filterOptions.map((options) => (
          <div key={options.id} className="flex items-center space-x-2 my-5">
            <Checkbox
              className="p-0"
              checked={appliedFilter?.includes(options?.label)}
              id={options.id}
              onClick={() => appliedFilterHandler(options.label)}
            />
            <Label
              htmlFor={options.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {options.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
