import { CloudUploadOutlined } from "@mui/icons-material";
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
    Paper,
    Button,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";

const Question = ({ number, type, question, phan, options, questionId, answer, onChange, typeExam, onFileChange }: any) => {
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});
    const [fileUrls, setFileUrls] = useState<{ [key: string]: string }>({});
    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('examAnswers') || '{}');
        setFiles(storedAnswers);
    }, []);

    const encodeFileToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const base64File = await encodeFileToBase64(selectedFile);
            setFiles((prevFiles: any) => ({
                ...prevFiles,
                [questionId]: { file: selectedFile, fileName: selectedFile.name }
            }));
            onFileChange(questionId, { fileData: base64File, fileName: selectedFile.name }); // Gửi lên component cha
            onChange(questionId, base64File, false, "TL1");
        }
    };


    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setFileUrls(prevUrls => ({ ...prevUrls, [id]: event.target.value }));
        onChange(id, event.target.value, false, "TL1");
    };
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
                return typeExam === 3 ? (
                    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                            >
                                Tải lên tệp
                                <input type="file" accept=".pdf,.doc,.docx" hidden onChange={(e: any) => handleFileChange(e, questionId)} />
                            </Button>
                            {files[questionId] && <Typography variant="body2">Tệp đã chọn: {files[questionId]?.name}</Typography>}
                        </Box>

                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Hoặc nhập đường dẫn Google Drive..."
                            value={fileUrls[questionId] || ""}
                            onChange={(e: any) => handleUrlChange(e, questionId)}
                            sx={{ marginTop: 2 }}
                        />
                    </Paper>
                ) : (
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Nhập câu trả lời..."
                        multiline
                        rows={4}
                        value={answer || ""}
                        onChange={(e) => onChange(questionId, e.target.value, false, "TL1")}
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
