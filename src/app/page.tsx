"use client";
import { DatePicker } from "@/shared/components/DatePicker";
import { useState } from "react"


export default function Home() {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
   return (
      <DatePicker
         startDate={dateRange[0]}
         endDate={dateRange[1]}
         onChange={setDateRange}
      />
   )
}
