import { Link, useParams } from "react-router";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import HeroImage from "../assets/hero_pizza.png";
import { Skeleton } from "./ui/skeleton";

const SearchPage = () => {
  const { text } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              value={searchQuery}
              placeholder="Search by resturant & cuisines"
            />
            <Button className="bg-orange-400">Search</Button>
          </div>
          {/*search cards*/}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
            <h1 className="font-medium text-xl">(2) search results found</h1>
            <div className="flex flex-wrap mb-4 md:mb-0">
              {["biryani", "jalebi"].map(
                (selectedFilter: string, idx: number) => (
                  <div className="relative inline-flex items-center max-w-full ">
                    <Badge
                      className="ml-2 rounded-medium pr-6"
                      variant="outline"
                    >
                      Biryani <X />
                    </Badge>
                  </div>
                )
              )}
            </div>
          </div>
          {/*Resturnat Card */}
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({length:4}).map((_,index:number)=>
            <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="relative">
              <AspectRatio ratio={16 / 6}>
                <img
                  src={HeroImage}
                  className="w-full h-full object-cover"
                ></img>
              </AspectRatio>
              <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Featured
                </span>
              </div>
            </div>
            <CardContent className="py-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-300 ">
                Pizza Hut
              </h1>
              <div className="mt-2 gap-1 flex items-center dark:text-gray-400 ">
                <MapPin></MapPin>
                <p className="text-sm">
                  City:
                  <span className="font-medium">Copenhagen</span>
                </p>
              </div>
              <div className="mt-2 gap-1 flex items-center dark:text-gray-400 ">
                <Globe />
                <p className="text-sm">
                  Country:
                  <span className="font-medium">Denmark</span>
                </p>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {["Pizza", "Italian"].map((cuisine: string, idx: number) => (
                  <Badge>{cuisine}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 dark:border-t-gray-100 text-white flex justify-end">
              <Link to={`/resturant/${123}`}>
                <Button className="bg-orange-500 hover:bg-orange-500 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                  View Menus
                </Button>
              </Link>
            </CardFooter>
          </Card>)}
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default SearchPage;


const SearchPageSkeleton = () => {
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
          >
            <div className="relative">
              <AspectRatio ratio={16 / 6}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardContent>
            <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
              <Skeleton className="h-10 w-24 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </>
    );
  };
  
  const NoResultFound = ({ searchText }: { searchText: string }) => {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          No results found
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We couldn't find any results for "{searchText}". <br /> Try searching
          with a different term.
        </p>
        <Link to="/">
          <Button className="mt-4 bg-orange hover:bg-orangeHover">
            Go Back to Home
          </Button>
        </Link>
      </div>
    );
  };