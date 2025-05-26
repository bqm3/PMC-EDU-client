import { useEffect, useState } from 'react';
import { Stack, Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
  mergeListVideo: any;
  handleVideoClick: any;
  currentVideo?: any;
};

export default function LessonList({ mergeListVideo, handleVideoClick, currentVideo }: Props) {

  return (
    <Stack sx={{ width: '100%', pr: 1 }}>
      {mergeListVideo?.map((item: any) => {
        const isWatched = item?.isWatch;

        return (
          <Card
            key={item?.ID_Lichhoc}
            sx={{
              marginBottom: "6px",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: isWatched ? "#ACE7AEFF" : "white", // Xanh nhạt nếu đã xem, trắng nếu chưa xem
              border: item?.ID_Lichhoc === currentVideo?.ID_Lichhoc ? "2px solid #2e7d32" : "1px solid #e0e0e0", // Viền xanh nếu đang chọn
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              },
            }}
            onClick={() => handleVideoClick(item)}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: "10px",
                pb: "10px !important",
              }}
            >
              <Stack spacing={0.5} sx={{ flex: 1, overflow: 'hidden' }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="text.primary"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item?.dm_tiethoc?.Tiethoc}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1, // giới hạn 1 dòng, bạn có thể đổi thành 2
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item?.Tieude}
                </Typography>
              </Stack>

              {isWatched && <CheckCircleIcon sx={{ color: "#2e7d32", ml: 1 }} />}
            </CardContent>

          </Card>

        );
      })}
    </Stack>
  );
}
