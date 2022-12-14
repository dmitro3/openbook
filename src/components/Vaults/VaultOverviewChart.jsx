// import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';
import { useEffect } from 'react';
import { Box, Button, Tab, Tabs, Typography, Grid, Card } from "@mui/material";
import dynamic from 'next/dynamic';

// const Chart = dynamic(() => import("react-apexcharts"));
const Chart = null;
export const VaultOverViewChart = (props) => {
    const chartData = {
        type: 'area',
        height: 150,
        options: {
            chart: {
                id: 'support-chart',
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 1
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: 'Ticket '
                },
                marker: {
                    show: false
                }
            }
        },
        series: [
            {
                data: props.data
            }
        ]
    };

    if(Chart == null){
        Chart = dynamic(() => import("react-apexcharts"));
    }

    return (
        <Card sx={{ bgcolor: 'white'}}>
            <div className="mixed-chart">
                {
                    typeof window !== "undefined" ? <Chart {...chartData} />  : void(0)
                }
            </div> 
        </Card>
    )
}