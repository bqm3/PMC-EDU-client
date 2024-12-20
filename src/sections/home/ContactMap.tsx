import Map from 'react-map-gl';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// config
import { MAPBOX_API } from '../../config';
// components
import Iconify from '../../components/iconify';
import { MapControl, MapMarker, MapPopup } from '../../components/map';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------


export default function ContactMap() {
  return (
    <StyledRoot>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5084318611925!2d105.80872637525614!3d21.01233298063276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36ca94dd63a92879%3A0xce358dc14b6e0ec5!2sSky%20City%20Tower!5e0!3m2!1svi!2s!4v1734666072562!5m2!1svi!2s" width="600" height="450" style={{ border: 0 }} loading="lazy"></iframe>
    </StyledRoot>
  );
}
