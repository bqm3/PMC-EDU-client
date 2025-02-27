import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({
    startExercise,
    setStartExercise,
    infoQues,
    handleSubmitExam,
    timeLeft
}: any) {
    const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState(timeLeft);

    useEffect(() => {
        if (startExercise && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prevTime: number) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        alert("Hết thời gian làm bài!");
                        handleSubmitExam()
                        // Xóa dữ liệu khi hết thời gian
                        // localStorage.removeItem('examStartTime');
                        // localStorage.removeItem('examAnswers');
                        // localStorage.removeItem('examQuestions');

                        // Dừng bài thi
                        setStartExercise(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [startExercise, remainingTime]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: 1 }}>
            <Typography variant="h5" color="green" gutterBottom>
                {infoQues?.Tenbaikt}
            </Typography>
            <Typography variant="body1" fontWeight="500" fontSize={18}>
                Số câu: {infoQues?.Socauhoi}
            </Typography>
            <Typography variant="subtitle1" fontWeight="500" fontSize={18}>
                Thời gian: {infoQues?.Thoigianthi} phút
            </Typography>

            {startExercise && (
                <Typography fontSize={14} color="red" fontWeight="bold" sx={{ marginTop: '16px' }}>
                    Thời gian còn lại: {formatTime(remainingTime)} ⏳
                </Typography>
            )}

            <Box sx={{ marginTop: '16px' }}>
                {startExercise && (
                    <Button sx={{ marginTop: '8px' }} variant="contained" color="primary" fullWidth onClick={() => handleSubmitExam()}>
                        Nộp bài
                    </Button>
                )}

                {!startExercise && (
                    <Button variant="contained" color="error" fullWidth sx={{ marginTop: '8px' }} onClick={() => navigate(-1)}>
                        Thoát ra ngoài
                    </Button>
                )}
            </Box>
        </Box>
    );
}
