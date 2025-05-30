import { List, ListItem, ListItemText, ListItemIcon, IconButton, Typography, ListItemButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link, useNavigate } from 'react-router-dom';
import { IBaiThi, ILophoc } from 'src/@types/course';
import { PATH_PAGE } from 'src/routes/paths';

type Props = {
  class_period?: any;
  course: ILophoc;
  listBaiThi: IBaiThi[]
  diemDanhCheck: any[];
};

export default function LessonList({ class_period, course, listBaiThi, diemDanhCheck }: Props) {

  const navigate = useNavigate();

  // Kiểm tra nếu bài học có thể mở khóa
  const isLessonUnlocked = (lesson: any) => {
    if (!lesson?.Ngay) return false;
    const now = new Date();
    const start = new Date(lesson.Ngay.split(" - ")[0]); // Chỉ lấy ngày bắt đầu
    return now >= start;
  };

  const formatDateTimeRange = (start: string, end: string) => {
    if (!start || !end) return "";

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Lấy giờ và phút
    const startTime = `${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, "0")}`;
    const endTime = `${endDate.getHours()}:${endDate.getMinutes().toString().padStart(2, "0")}`;

    // Lấy ngày, tháng, năm
    const day = startDate.getDate().toString().padStart(2, "0");
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0"); // getMonth() trả về từ 0-11
    const year = startDate.getFullYear();

    return `${startTime} - ${endTime} ${day}/${month}/${year}`;
  };

  const watchedVideos = new Set(
    diemDanhCheck.map((dd: any) => dd.ID_Lichhoc).filter((id) => id != null)
  );

  return (
    <List
      sx={{
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        borderRadius: "4px",
        padding: "4px",
        gap: "4px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {class_period?.map((lesson: any, index: number) => {
        const unlocked = isLessonUnlocked(lesson);
        const isWatched = watchedVideos.has(lesson?.ID_Lichhoc);

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
          if (!unlocked) return;
          e.stopPropagation();
          if (`${course?.ID_Hinhthucdt}` !== "2" && lesson?.urlVideo) {
            window.open(lesson.urlVideo, "_blank");
          } else if (course?.Malop && lesson?.Slug) {
            navigate(PATH_PAGE.courstByMe.learning(`${course.Malop}`, `${lesson.Slug}`), {
              replace: true,
              state: { lophoc: course?.Tenlop },
            });
          }
        };

        return (
          <ListItemButton
            key={index}
            onClick={unlocked ? handleClick : undefined}
            sx={{
              backgroundColor: isWatched ? "#ACE7AEFF" : "#fff", // ✅ Đã xem thì xanh
              borderRadius: "4px",
              padding: "10px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              cursor: unlocked ? "pointer" : "default",
              '&:hover': {
                backgroundColor: unlocked ? '#f5f5f5' : undefined,
              },
            }}
          >
            <ListItemIcon>
              {unlocked ? <PlayCircleIcon color="success" /> : <LockIcon color="disabled" />}
            </ListItemIcon>

            <ListItemText>
              <Typography variant="subtitle1" fontWeight="bold">
                {lesson?.Tieude}
              </Typography>
              <Typography variant="caption">
                {formatDateTimeRange(lesson?.Giobatdau, lesson?.Gioketthuc)}
              </Typography>
            </ListItemText>

            {`${course?.ID_Hinhthucdt}` !== "2" && unlocked && lesson?.urlVideo ? (
              <ListItemIcon>
                <IconButton onClick={(e) => e.stopPropagation()}>🔗</IconButton>
              </ListItemIcon>
            ) : (
              !unlocked === false && (
                <IconButton color="primary">📖</IconButton>
              )
            )}
          </ListItemButton>
        );
      })}

    </List>

  );
}
