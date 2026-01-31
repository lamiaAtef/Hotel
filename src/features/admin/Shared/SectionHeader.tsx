import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import type { SectionHeaderProps } from '../type';

export default function SectionHeader({title,subtitle,buttonText,onButtonClick}:SectionHeaderProps) {
  return (
    <>
    <Box component="div" display="flex" justifyContent="space-between" alignItems="center" sx={{marginX:"20px"}}>
        <Stack>
            <Typography variant="h6">
                {title}
            </Typography>
            <Typography variant="subtitle1">
                {subtitle}
            </Typography>
        </Stack>

        {buttonText &&

        <Button onClick={onButtonClick} variant="contained" className='btnAdmin'>
          {buttonText}
        </Button>
}

    </Box>
      
    </>
  )
}

