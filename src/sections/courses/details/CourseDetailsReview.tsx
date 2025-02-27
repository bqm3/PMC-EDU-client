import { List, ListItem, ListItemText, ListItemIcon, IconButton, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link } from 'react-router-dom';

type Props = {
  course?: any;
};

export default function LessonList({ course }: Props) {
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




  return (
    <List sx={{ backgroundColor: "#f9f9f9", display: 'flex', flexDirection: 'column', borderRadius: "4px", padding: "4px", gap: "4px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
      {course?.map((lesson: any, index: number) => {
        const unlocked = isLessonUnlocked(lesson);

        return (
          <ListItem
            key={index}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              padding: "10px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Icon bài học */}
            <ListItemIcon>
              {unlocked ? <PlayCircleIcon color="success" /> : <LockIcon color="disabled" />}
            </ListItemIcon>

            {/* Tiêu đề bài học */}
            <ListItemText>
              <Typography variant="subtitle1" fontWeight="bold">
                {lesson?.Tieude}
              </Typography>
              <Typography variant="caption" >
                {formatDateTimeRange(lesson?.Giobatdau, lesson?.Gioketthuc)}
              </Typography>
            </ListItemText>

            {/* Nút xem video nếu mở khóa */}
            {unlocked && lesson?.urlVideo && (
              <IconButton component="a" href={lesson.urlVideo} target="_blank">
                🔗
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
