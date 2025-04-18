import { useState } from 'react';
import sumBy from 'lodash/sumBy';
import { styled } from '@mui/material/styles';
// @mui
import {
  Grid,
  Divider,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Button,
  LinearProgress,
  Stack,
  Box,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// ----------------------------------------------------------------------

type Props = {
  course?: any;
  accordionClicked: any;
  expandedAccordions: any;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ProductDetailsReview({
  course,
  accordionClicked,
  expandedAccordions,
}: Props) {
  return (
    <Box
      sx={{
        marginTop: 3,
        backgroundColor: '#f9f9f9',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      {course?.map((lesson: any, index: any) => (
        <Accordion
          key={index}
          sx={{ backgroundColor: '#fff', marginBottom: '8px' }}
          // expanded={expanded === index}
          onChange={() => accordionClicked(index)}
          expanded={expandedAccordions.includes(index)}
        >
          <AccordionSummary
            expandIcon={expandedAccordions.includes(index) ? <RemoveIcon /> : <AddIcon />}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {lesson?.Tiethoc}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '8px', mx: 1 }}>
            {lesson?.videos?.map((item: any, index: number) => (
              <Stack
                key={index}
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  p: 0.5,
                  gap: 1,
                  borderColor: 'lightgray',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  mb: 1,
                  borderRadius: 0.5,
                }}
              >
                <PlayCircleIcon color="warning" sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: 16 }}>
                  {item?.Thutu}. {item?.Tenvideo}
                </Typography>
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
// ----------------------------------------------------------------------
