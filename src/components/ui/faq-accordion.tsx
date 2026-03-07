"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { FAQItem } from "@/types/domain";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState(items[0]?.id);

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <Card
            key={item.id}
            className="cursor-pointer p-0"
            onClick={() => setOpenId(isOpen ? "" : item.id)}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-5">
              <div>
                <p className="text-base font-semibold text-ink">{item.question}</p>
                <p className="mt-1 text-sm text-muted">{item.category}</p>
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={cn("h-4 w-4 text-muted transition", isOpen && "rotate-180")}
              />
            </div>
            {isOpen ? (
              <div className="border-t border-rose-100 px-6 py-5 text-sm leading-7 text-muted">
                {item.answer}
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
