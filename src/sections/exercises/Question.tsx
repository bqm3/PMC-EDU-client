import {
    Typography,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Select,
    MenuItem,
    Box,
} from "@mui/material";

const Question = ({ number, type, question, phan, options, questionId, answer, onChange }: any) => {

    // Render từng loại câu hỏi
    const renderQuestionType = () => {
        switch (type) {
            case "TN1": // Trắc nghiệm 1 đáp án đúng
                return (
                    <RadioGroup onChange={(e) => onChange(questionId, e.target.value, false, "TN1")}>
                        <Grid container spacing={2}>
                            {options?.map((option: any, index: number) => (
                                <Grid item xs={6} key={index}>
                                    <FormControlLabel
                                        value={option.value}
                                        control={<Radio checked={`${answer}` === `${option.value}`} />}
                                        label={
                                            <Typography>
                                                <strong>{option.label}</strong> {option.text}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </RadioGroup>
                );

            case "TN2": // Trắc nghiệm nhiều đáp án đúng
                return (
                    <Grid container spacing={2}>
                        {options?.map((option: any, index: number) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={option.value}
                                            checked={answer?.includes(option?.value)}
                                            onChange={(e) => onChange(questionId, option.value, e.target.checked, "TN2")}
                                        />
                                    }
                                    label={
                                        <Typography>
                                            <strong>{option.label}</strong> {option.text}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                );

            case "TN3": // Điền vào chỗ trống
                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Điền câu trả lời..."
                        value={answer || ""}
                        onChange={(e) => onChange(questionId, e.target.value, "TN3")}
                    />
                );

            case "TN4": // Sắp xếp lại
                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="..........."
                        value={answer || ""}
                        onChange={(e) => onChange(questionId, e.target.value, "TN4")}
                    />
                );

            case "TL1": // Tự luận
                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Nhập câu trả lời..."
                        multiline
                        rows={4}
                        value={answer || ""}
                        onChange={(e) => onChange(questionId, e.target.value, "TL1")}
                    />
                );


            case "CHS": // Câu hỏi số
                return (
                    <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        placeholder="Nhập số..."
                        value={answer || ""}
                        onChange={(e) => onChange(questionId, e.target.value, false, "CHS")}
                    />
                );

            case "CHDS": // Câu hỏi đúng/sai
                return (
                    <RadioGroup value={answer || ""} onChange={(e) => onChange(questionId, e.target.value, false, "CHDS")}>
                        <FormControlLabel value="true" control={<Radio />} label="Đúng" />
                        <FormControlLabel value="false" control={<Radio />} label="Sai" />
                    </RadioGroup>
                );

            case "CHGN": // Câu hỏi ghép nối
                return (
                    <Grid container spacing={2}>
                        {options?.map((option: any, index: number) => (
                            <Grid item xs={6} key={index}>
                                <Typography>{option.left}</Typography>
                                <Select
                                    fullWidth
                                    value={answer?.[option.left] || ""}
                                    onChange={(e) => onChange(questionId, { ...answer, [option.left]: e.target.value }, false, "CHGN")}
                                >
                                    {option.right.map((match: any, i: number) => (
                                        <MenuItem value={match} key={i}>
                                            {match}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        ))
                        }
                    </Grid >
                );

            default:
                return <Typography>Một loại câu hỏi không được hỗ trợ!</Typography>;
        }
    };


    return (
        <div>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1" gutterBottom color="red">
                    Câu hỏi {number}.
                </Typography>
                <Typography variant="subtitle2" gutterBottom color="black">
                    {phan?.Tenphan}
                </Typography>
            </Box>

            {/* Nội dung câu hỏi */}
            <Typography variant="body1" gutterBottom>
                {question}
            </Typography>

            {/* Loại câu hỏi */}
            {renderQuestionType()}
        </div>

    );
};

export default Question;
