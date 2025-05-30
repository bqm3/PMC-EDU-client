import { Stack, Card, CardContent, Typography, Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { IBaiThi, IHocvien } from 'src/@types/course';
import { useEffect, useRef } from 'react';

type Props = {
  mergeListVideo: any;
  handleVideoClick: any;
  currentVideo?: any;
  hocVien: IHocvien | null;
};

export default function LessonList({ mergeListVideo, handleVideoClick, currentVideo, hocVien }: Props) {
  const navigate = useNavigate();

  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentVideo]);

  return (
    <Stack sx={{ width: '100%', pr: 1 }}>
      {mergeListVideo?.map((item: any) => {
        const isWatched = item?.isWatch;
        const baiThi = item?.dt_baithi;
        const currentLesson = item?.dm_tiethoc?.ID_Tiethoc;
        const isFirstLesson = currentLesson === 1;

        // Tìm lịch học trước đó
        const prev = mergeListVideo.find(
          (v: any) => v.dm_tiethoc?.ID_Tiethoc === currentLesson - 1
        );

        const isLocked = !isFirstLesson && !prev?.isWatch;

        return (
          <Box key={item?.ID_Lichhoc}>
            {/* Card lịch học */}
            <Card
              sx={{
                mb: 1,
                borderRadius: 1,
                cursor: isLocked ? "not-allowed" : "pointer",
                backgroundColor: isWatched ? "#ACE7AEFF" : "#fff",
                border: item?.ID_Lichhoc === currentVideo?.ID_Lichhoc ? "2px solid #2e7d32" : "1px solid #e0e0e0",
                pointerEvents: isLocked ? "none" : "auto",
                opacity: isLocked ? 0.6 : 1,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => !isLocked && handleVideoClick(item)}
            >

              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  pb: "10px !important",
                }}
              >
                <Stack spacing={0.5} sx={{ flex: 1, overflow: "hidden" }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="text.primary"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item?.dm_tiethoc?.Tiethoc}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item?.Tieude}
                  </Typography>
                </Stack>

                {isWatched && (
                  <CheckCircleIcon sx={{ color: "#2e7d32", ml: 1 }} />
                )}
              </CardContent>
            </Card>

            {/* 📝 Luôn hiển thị bài thi nếu có */}
            {baiThi && (
              <Card
                sx={{
                  my: 1,
                  ml: 2,
                  backgroundColor: isWatched ? "#fff4e5" : "#f0f0f0",
                  borderLeft: isWatched ? "4px solid #ffa726" : "4px solid #ccc",
                  cursor: isWatched ? "pointer" : "not-allowed",
                  opacity: isWatched ? 1 : 0.5,
                  pointerEvents: isWatched ? "auto" : "none", // chặn click nếu chưa xem video
                  "&:hover": {
                    boxShadow: isWatched ? "0px 4px 10px rgba(0,0,0,0.15)" : "none",
                  },
                  pb: 0.5
                }}
                onClick={() =>
                  isWatched &&
                  navigate(`/thi-truc-tuyen/${baiThi.SlugTenbaikt}`, {
                    state: {
                      exam: baiThi,
                      hocvien: hocVien,
                      type: "item",
                      lichHoc: item,
                    },
                  })
                }
              >
                <CardContent
                  sx={{
                    paddingTop: 1,
                    paddingX: 1,
                    "&:last-child": {
                      paddingBottom: '4px',
                    },
                  }}
                >

                  <Typography variant="body2" fontWeight="medium" color="text.primary">
                    📝 Bài kiểm tra: {baiThi.Tenbaikt}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {baiThi.Socauhoi} câu | {baiThi.Thoigianthi} phút
                  </Typography>
                </CardContent>
              </Card>
            )
            }

          </Box>
        );
      })}

    </Stack >
  );
}
