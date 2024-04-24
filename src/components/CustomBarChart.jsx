import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import styled from "styled-components";

const CustomTooltip = styled.div`
  background-color: #e6f2ff; /* Light blue */
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TooltipText = styled.p`
  margin: 0;
  font-weight: bold;
  color: #333; /* Dark gray */
`;

const TooltipMain = styled.h2`
  margin: 0;
  font-weight: bold;
  color: #000; /* Black */
`;

const CustomTooltipContent = ({ active, payload, dataKey }) => {
  if (active && payload && payload.length) {
    const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;

    return (
      <CustomTooltip>
        {dataKey === "attendancePercentage" ? (
          <>
            <TooltipMain>{subject}</TooltipMain>
            <TooltipText>Attended: ({attendedClasses}/{totalClasses})</TooltipText>
            <TooltipText>{attendancePercentage}%</TooltipText>
          </>
        ) : (
          <>
            <TooltipMain>{subName.subName}</TooltipMain>
            <TooltipText>Marks: {marksObtained}</TooltipText>
          </>
        )}
      </CustomTooltip>
    );
  }

  return null;
};

const CustomBarChart = ({ chartData, dataKey }) => {
  const subjects = chartData.map((data) => data.subject);
  const distinctColors = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#ffdbac"];

  return (
    <BarChart width={500} height={500} data={chartData}>
      <XAxis dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"} />
      <YAxis domain={[0, 100]} />
      <Tooltip content={<CustomTooltipContent dataKey={dataKey} />} />
      <Bar dataKey={dataKey}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={distinctColors[index]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default CustomBarChart;
