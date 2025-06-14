"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Bookmark, Heart } from "lucide-react";
import { motion } from "framer-motion";


export type admissionCardProps = {
  key?: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  herf: string;
  page : string;
  bookmark?: boolean;
  wishlist?: boolean;
};






export function OtherCard({ title, description, imageUrl, herf, bookmark, wishlist , page}: admissionCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden" // Initial state before animation
      whileInView="visible" // Animate to 'visible' when in view
      viewport={{ once: true, amount: 0.2 }} // Animate once, when 30% of the item is visible
      transition={{ duration: 0.7, ease: "easeOut" }} // Animation duration and easing
      className="max-w-sm flex flex-col justify-between hover:shadow-lg transition-shadow p-0"
    >
      <Card className="max-w-sm flex flex-col justify-between hover:shadow-lg transition-shadow p-0">
        {imageUrl && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover rounded-t-md"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}
        <div className="flex flex-col flex-grow justify-between h-full">
          <CardContent className="flex-grow">
            <h4 className="font-bold text-lg overflow-hidden line-clamp-2">{title}</h4>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {description}
            </p>
            {/* "Read More" button only appears if description is long enough to be clamped */}
            {description.length > 100 && ( // Adjust this length based on your desired truncation point
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" size="sm" className="px-0 py-4 h-auto text-primary">
                    Read More
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                      {`full ${page} Descritption`}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 text-sm text-foreground max-h-[70vh] overflow-y-auto"> {/* Added max-height and overflow for long descriptions */}
                    {description}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
          <CardFooter className="flex justify-between px-4 pb-4">

            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">
                    <Bookmark
                      className={`size-5 ${bookmark ? 'fill-primary text-primary' : 'text-muted-foreground'}`
                      }
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{bookmark ? "Remove from Bookmark" : "Add to Bookmark"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">
                    <Heart
                      className={`size-5 ${wishlist ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{wishlist ? "Remove from wishlist" : "Add to wishlist"}</p>
                </TooltipContent>
              </Tooltip>
            </div>


            <Link href={herf} target="_blank">
              <Button size="sm">View</Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}