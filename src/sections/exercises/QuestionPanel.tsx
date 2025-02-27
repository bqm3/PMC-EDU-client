import {
    Box
} from '@mui/material';
import Question from './Question';

export default function QuestionPanel({

    handleAnswerChange,
    answers,
    setAnswers,
    currentQuestion,
}: // setCurrentQuestion,
    any) {
    const formattedData = currentQuestion?.question?.nhchda_list?.map((item: any, index: number) => {
        const labels = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.']; // Mảng các nhãn tương ứng
        return {
            label: labels[index], // Gán nhãn A, B, C, D tương ứng
            value: item.Noidungda, // Giữ nguyên giá trị của đáp án
            text: item.Noidungda, // Giữ nguyên nội dung
        };
    });

    return (
        <>
            <Box
                sx={{
                    padding: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    mb: "12px"
                }}
            >
                <Question
                    number={currentQuestion?.question?.Thutu}
                    type={currentQuestion?.question?.dm_loaich?.Maloaich}
                    question={currentQuestion?.question?.NoidungCH}
                    phan={currentQuestion?.phan}
                    options={formattedData}
                    questionId={currentQuestion?.question?.ID_NHCH}
                    answer={answers[currentQuestion?.question?.ID_NHCH] || ""}
                    onChange={handleAnswerChange}
                />

            </Box>
        </>
    );
}
