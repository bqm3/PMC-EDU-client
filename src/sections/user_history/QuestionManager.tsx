import { Box, Typography, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useSearchParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useRef, useCallback } from 'react';
import axios from '../../utils/axios';
import Question from './QuestionDetail';


export default function QuestionPanel({ currentBaiThiHocVien }: any) {
    const safeQuestions = Array.isArray(currentBaiThiHocVien) ? currentBaiThiHocVien : [];


    // ✅ State lưu điểm của học viên
    const [feedbacks, setFeedbacks] = useState<any>({});

    // ✅ Ref lưu vị trí câu hỏi để scroll
    const questionRefs = useRef<any>({});

    // ✅ Nhóm câu hỏi theo `ID_NHCH`
    const groupedQuestions = safeQuestions.reduce((acc: any, item: any) => {
        const { ID_NHCH } = item;
        if (!acc[ID_NHCH]) {
            acc[ID_NHCH] = {
                ...item.dt_nhch, // ✅ Giữ nguyên toàn bộ dữ liệu câu hỏi
                userAnswers: item.dt_nhch.userAnswers || [],
            };
        }
        return acc;
    }, {});

    // ✅ Tính tổng điểm của học viên
    const totalPossibleScore = Object.values(groupedQuestions).reduce(
        (sum: any, q: any) => sum + (q.Diemtoida || 0),
        0
    );

    const totalUserScore = Object.keys(feedbacks).reduce(
        (sum: any, i: any) => sum + (parseFloat(feedbacks[i]?.score?.toString()) || 0),
        0
    );

    // ✅ Hàm cập nhật điểm khi chỉnh sửa
    const handleFeedbackChange = useCallback((questionId: any, score: any, feedback: any) => {
        setFeedbacks((prev: any) => {
            const existing = prev[questionId];

            // ✅ Nếu chưa có trong feedbacks, mặc định `isUpdate: 0`
            if (!existing) {
                return {
                    ...prev,
                    [questionId]: {
                        score: Number(score),
                        feedback,
                        isUpdate: 0, // Mặc định là 0
                    },
                };
            }
            const isChanged = existing.score !== Number(score) || existing.feedback !== feedback;

            return {
                ...prev,
                [questionId]: {
                    score: Number(score),
                    feedback,
                    isUpdate: isChanged ? 1 : existing.isUpdate, // ✅ Chỉ đổi `isUpdate: 1` khi giá trị thay đổi
                },
            };
        });
    }, []);

    // ✅ Hàm scroll đến câu hỏi khi bấm vào sidebar
    const handleScrollToQuestion = (i: any) => {
        const element = questionRefs.current[i];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Grid container spacing={3}>
            {/* 📝 Cột hiển thị danh sách câu hỏi */}
            <Grid item xs={12} md={8} lg={8} sx={{ overflowY: 'auto' }}>
                <Box sx={{ padding: '4px' }}>
                    {Object.values(groupedQuestions).map((data: any) => (
                        <Box
                            key={data.ID_NHCH}
                            ref={(el: any) => {
                                questionRefs.current[data.ID_NHCH] = el;
                            }}
                        >
                            <Question dataQues={data} onFeedbackChange={handleFeedbackChange} />
                        </Box>
                    ))}
                </Box>
            </Grid>

            {/* 📊 Cột hiển thị danh sách câu hỏi và tổng điểm */}
            <Grid
                item
                xs={12}
                md={4}
                lg={4}

            >

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Danh sách câu hỏi
                </Typography>
                <List sx={{
                    overflowY: 'auto',
                    backgroundColor: 'white',
                }}>
                    {Object.values(groupedQuestions).map((q: any) => (
                        <ListItem button key={q.ID_NHCH} onClick={() => handleScrollToQuestion(q.ID_NHCH)}>
                            <ListItemText primary={`Câu ${q.Thutu}`} />
                            <Typography variant="body2" sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
                                {feedbacks[q.ID_NHCH]?.score ?? 0} / {q.Diemtoida}
                            </Typography>
                        </ListItem>
                    ))}
                </List>

                {/* 📊 Hiển thị tổng điểm */}
                <Box
                    sx={{
                        mt: 1,
                        p: 1,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                        Tổng điểm: {totalUserScore} / {totalPossibleScore}
                    </Typography>
                </Box>


            </Grid>
        </Grid>
    );
}
