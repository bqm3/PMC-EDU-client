import { Box, Button, Typography } from '@mui/material';

export default function QuestionNavigation({
    answers,
    questions,
    infoQues,
    setCurrentQuestion,
}: any) {
    return (
        <Box sx={{ padding: '12px', borderTop: '1px solid #ccc' }}>
            {questions.map((phan: any) => (
                <Box key={phan.ID_Baithi_Phan} sx={{ mb: 2 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 'bold', mb: 1 }}
                    >
                        {phan.Tenphan}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {phan.ds_cauhoi.map((question: any, index: number) => {
                            const isAnswered =
                                answers[question.ID_NHCH] !== undefined &&
                                answers[question.ID_NHCH] !== null &&
                                !(Array.isArray(answers[question.ID_NHCH]) && answers[question.ID_NHCH].length === 0) &&
                                answers[question.ID_NHCH] !== '';

                            return (
                                <Button
                                    key={question.ID_NHCH}
                                    variant={isAnswered ? 'contained' : 'outlined'}
                                    size="small"
                                    sx={{ width: '48px', height: '32px' }}
                                    onClick={() =>
                                        setCurrentQuestion({
                                            question,
                                            phan: {
                                                ID_Baithi_Phan: phan.ID_Baithi_Phan,
                                                Tenphan: phan.Tenphan,
                                            },
                                        })
                                    }
                                >
                                    <Typography sx={{ fontSize: 12 }}>
                                        Câu {index + 1}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
