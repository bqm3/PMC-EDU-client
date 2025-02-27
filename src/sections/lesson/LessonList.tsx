import { useEffect, useState } from 'react';
import sumBy from 'lodash/sumBy';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// utils
import { fShortenNumber } from '../../utils/formatNumber';
// @types
import { IProduct } from '../../@types/product';
// components
import Iconify from '../../components/iconify';
// _mock_
import { _faqs } from '../../_mock/arrays';

import ReactPlayer from 'react-player';
import { m } from 'framer-motion';
import { IVideoOnline } from 'src/@types/course';

// ----------------------------------------------------------------------

type Props = {
  mergeListVideo: any,
  handleVideoClick: any,
  currentVideo?: IVideoOnline
};

export default function LessonList({ mergeListVideo, handleVideoClick, currentVideo }: Props) {
  const [expanded, setExpanded] = useState<string | false>(currentVideo?.ID_Tiethoc || false);

  useEffect(() => {
    if (currentVideo) {
      setExpanded(currentVideo?.ID_Tiethoc); // Mở Accordion chứa video hiện tại
    }
  }, [currentVideo]);

  return (
    <Stack sx={{ width: '100%', pr: 1 }}>
      {mergeListVideo?.map((diemdanh: any) => {
        const watchedCount = diemdanh?.videos?.filter((item: any) => item?.isWatch).length || 0;

        return (
          <Accordion
            key={diemdanh?.ID_Tiethoc}
            sx={{
              backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: '4px', '&.Mui-expanded': {
                // Tắt hiệu ứng mở rộng ở đây
                margin: '0', // Tắt padding (nếu cần)
              },
            }}

            expanded={expanded === diemdanh?.ID_Tiethoc}
            onChange={() => setExpanded(expanded === diemdanh?.ID_Tiethoc ? false : diemdanh?.ID_Tiethoc)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.08)',
              }}
            >
              <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                <Typography variant="subtitle1">{diemdanh?.Tiethoc}</Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {watchedCount}/{diemdanh?.videos?.length}
                </Typography>
              </Grid>
            </AccordionSummary>

            {diemdanh?.videos?.map((item: any) => (
              <AccordionDetails
                key={item?.ID_Video}
                sx={{
                  padding: '4px',
                  pl: 2,
                  cursor: 'pointer',
                  backgroundColor: item?.ID_Video === currentVideo?.ID_Video ? '#cfe2f3' : 'transparent', // Màu xanh nhạt nếu đang chọn
                }}
                onClick={() => handleVideoClick(item)}
              >
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" fontWeight="bold" display="flex" alignItems="center" gap={0.5}>
                      {item?.Tenvideo}
                      {item?.isWatch && <CheckCircleIcon sx={{ color: '#8fce00' }} fontSize="small" />}
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      {item?.dm_tiethoc?.Tiethoc}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            ))}
          </Accordion>
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------
