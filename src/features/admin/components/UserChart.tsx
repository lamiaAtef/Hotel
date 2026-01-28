import { Box, Grid, Stack, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

type PieArcLabelProps = {
  data: {
    category: string;
    value: number;
  }[];
};

export default function PieArcLabel({ data }: PieArcLabelProps) {

  return (
    
    <Grid container  alignItems="center">
        <Grid size={{ xs: 12, sm: 6 }}>
            <PieChart
            series={[
                {
                data: data,
                arcLabel: (item) => `${item.value}% `,
                arcLabelMinAngle: 35,
                arcLabelRadius: '60%',
                
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
                },
            }}
            width={200}
            height={200} 
            
            />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}  >
            <Box  sx={{display:"flex",gap:3, flexDirection:"column", justifyContent:"center", height:"100%"}}>
                <Box sx={{display:"flex", alignItems:"center"}}>
                <Box
                    sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#1976d2",
                        display: "inline-block",    
                    }}
                    >
                </Box>
                    <Typography component="span" sx={{display:"inline-block", ml:2}}>User</Typography>

                </Box>
                <Box sx={{display:"flex", alignItems:"center"}}>
                <Box 
                    sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#FFB422",
                        display: "inline-block",
                    }}
                    >
                </Box>
                 <Typography component="span" sx={{display:"inline-block", ml:2}}>Admin</Typography>

                </Box>
            </Box>
    </Grid>
    </Grid>
    
  );
 
}
