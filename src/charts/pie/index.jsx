import React from 'react'
import PieChartDemographics from './PieChartDemoGraphics'
import PieChartInterest from './PieChartInterest'
import PieChartGender from './PieChartGender.jsx'
import PieChartLocation from './PieChartLocation.jsx'

export const PieCharts = () => {
  return (
    <div>
        <PieChartDemographics/>
        <PieChartLocation/>
        <PieChartInterest/>
        <PieChartGender/>
    </div>
  )
}
