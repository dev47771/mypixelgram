import React from 'react'
import { Typography } from '@/shared/components/Typography'

type UserStatsProps = {
   followers: number
   following: number
   publications: number
}

export const UserStats = ({ followers, following, publications }: UserStatsProps) => (
   <div className="flex gap-25 text-center">
      <Stat label="Following" value={following} />
      <Stat label="Followers" value={followers} />
      <Stat label="Publications" value={publications} />
   </div>
)

const Stat = ({ label, value }: { label: string; value: number }) => (
   <div className="flex flex-col items-start">
      <Typography variant={'captionBold'}>{value}</Typography>
      <Typography variant={'captionRegular'}>{label}</Typography>
   </div>
)
