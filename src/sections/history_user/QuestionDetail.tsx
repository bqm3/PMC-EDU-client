import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Grid,
    TextField,
    IconButton,
    Dialog,
    DialogContent, DialogTitle,
    DialogActions,
    Button
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";


const Question = ({ dataQues, onFeedbackChange, hinhthucthi }: any) => {

    const [openFullscreen, setOpenFullscreen] = useState(false);

    const isWebView = hinhthucthi === "3" || hinhthucthi === 3;
    const handleOpenFullscreen = () => setOpenFullscreen(true);
    const handleCloseFullscreen = () => setOpenFullscreen(false);
    // ✅ Lấy danh sách đáp án đúng từ `nhchtl_list`
    const correctAnswers = dataQues?.nhchtl_list?.map((item: any) => item.ID_NHCHDA) || [];

    // ✅ Lấy danh sách đáp án học viên đã chọn
    let userAnswers = dataQues?.userAnswers?.map((ans: any) => ans.ID_NHCHDA) || [];

    // ✅ Nếu là câu tự luận, lấy `Noidungtl`
    const isEssayType = [3, 4, 5, 6].includes(dataQues?.ID_LoaiCH);
    if (isEssayType) {
        userAnswers = [dataQues?.userAnswers[0]?.Noidungtl || ""];
    }

    const isCorrect = isEssayType ? !!userAnswers[0] : (
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((ans: any) => correctAnswers.includes(ans))
    );


    const [score, setScore] = useState<number | string>(
        isCorrect ? (dataQues?.userAnswers[0]?.Diem) : 0
    );

    const [feedback, setFeedback] = useState<string>("");

    // ✅ Cập nhật điểm khi thay đổi (nếu sai thì luôn là 0)
    useEffect(() => {
        if (dataQues?.userAnswers[0]?.Diem !== undefined) {
            setScore(dataQues?.userAnswers[0]?.Diem);
            setFeedback(dataQues?.userAnswers[0]?.iPhanhoi);
        }
    }, [dataQues?.userAnswers]);


    // ✅ Gửi dữ liệu lên component cha
    useEffect(() => {
        onFeedbackChange(dataQues?.ID_NHCH, score, feedback);
    }, [score, feedback, dataQues?.ID_NHCH, onFeedbackChange]);


    // ✅ Xác định màu của từng đáp án
    const getAnswerColor = (optionID: any) => {
        if (correctAnswers.includes(optionID) && userAnswers.includes(optionID)) return "green"; // 🟢 Học viên chọn đúng
        if (userAnswers.includes(optionID) && !correctAnswers.includes(optionID)) return "red"; // 🔴 Học viên chọn sai
        if (correctAnswers.includes(optionID)) return "#ff4f00"; // 🔵 Đáp án đúng nhưng học viên chưa chọn
        return "black";
    };

    // ✅ Render từng loại câu hỏi
    const renderQuestionType = () => {

        const fileUrl = userAnswers[0];

        switch (`${dataQues?.ID_LoaiCH}`) {
            case "1": // Trắc nghiệm 1 đáp án đúng
                return (
                    <RadioGroup>
                        <Grid container spacing={1}>
                            {dataQues?.nhchda_list?.map((option: any, index: number) => (
                                <Grid item xs={6} key={index}>
                                    <FormControlLabel
                                        value={option.ID_NHCHDA}
                                        control={<Radio checked={userAnswers.includes(option.ID_NHCHDA)} />}
                                        label={
                                            <Typography sx={{ color: getAnswerColor(option.ID_NHCHDA) }}>
                                                <strong>{option.Noidungda}</strong>
                                                {correctAnswers.includes(option.ID_NHCHDA) ? " ✔" : ""}
                                                {userAnswers.includes(option.ID_NHCHDA) && !correctAnswers.includes(option.ID_NHCHDA) ? " ✖" : ""}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </RadioGroup>
                );

            case "2": // Trắc nghiệm nhiều đáp án đúng
                return (
                    <Grid container spacing={1}>
                        {dataQues?.nhchda_list?.map((option: any, index: number) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={<Checkbox checked={userAnswers.includes(option.ID_NHCHDA)} />}
                                    label={
                                        <Typography sx={{ color: getAnswerColor(option.ID_NHCHDA) }}>
                                            <strong>{option.Noidungda}</strong>
                                            {correctAnswers.includes(option.ID_NHCHDA) ? " ✔" : ""}
                                            {userAnswers.includes(option.ID_NHCHDA) && !correctAnswers.includes(option.ID_NHCHDA) ? " ✖" : ""}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                );

            case "3": // Điền vào chỗ trống (TN3)
            case "4": // Sắp xếp lại (TN4)
            case "5": // Một kiểu câu tự luận
            case "6": // Một kiểu câu tự luận khác
                return isWebView ? (
                    <Box
                        sx={{
                            mt: 1,
                            p: 2,
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            File đính kèm:
                        </Typography>
                        {fileUrl ? (
                            <iframe
                                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} // ✅ Thêm tham số vào URL
                                width="100%"
                                height="400px"
                                style={{ border: "none", marginTop: "8px" }}
                                title={`file-${dataQues.ID_NHCH}`} // ✅ Thêm title duy nhất
                            />
                        ) : (
                            <Typography variant="body2" color="error">
                                Không có file nào được tải lên.
                            </Typography>
                        )}
                    </Box>

                ) : (
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Nhập câu trả lời..."
                        multiline
                        rows={3}
                        value={fileUrl || ""}
                        sx={{ mt: 0.5 }}
                    />
                );

            case "7": // Câu hỏi đúng/sai
                return (
                    <RadioGroup>
                        <FormControlLabel
                            value="true"
                            control={<Radio checked={userAnswers.includes("true")} />}
                            label={<Typography sx={{ color: getAnswerColor("true") }}><strong>Đúng</strong></Typography>}
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio checked={userAnswers.includes("false")} />}
                            label={<Typography sx={{ color: getAnswerColor("false") }}><strong>Sai</strong></Typography>}
                        />
                    </RadioGroup>
                );

            default:
                return <Typography variant="body2" color="error">Loại câu hỏi chưa hỗ trợ!</Typography>;
        }
    };

    return (
        <Box
            sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                mb: "12px",
                backgroundColor: "#f9f9f9",
            }}
        >
            <Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "700" }}>
                        Câu {dataQues?.Thutu}. ({dataQues?.Diemtoida} điểm){"  "}
                        {![3, 4, 5, 6].includes(dataQues?.ID_LoaiCH) && (
                            <span style={{ color: isCorrect ? "green" : "red" }}>
                                {isCorrect ? "Đúng ✅" : "Sai ❌"}
                            </span>
                        )}
                    </Typography>

                    {/* 🔍 Nút phóng to file */}
                    {isWebView && userAnswers[0] && (
                        <IconButton onClick={handleOpenFullscreen} sx={{ ml: 1 }}>
                            <FullscreenIcon />
                        </IconButton>
                    )}
                </Box>

            </Box>

            {renderQuestionType()}

            <Dialog open={openFullscreen} onClose={handleCloseFullscreen} maxWidth="lg" fullWidth>
                {/* Tiêu đề & Nút đóng */}
                <DialogTitle>
                    Xem File Đính Kèm
                    <IconButton
                        onClick={handleCloseFullscreen}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <iframe
                            src={userAnswers[0]}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            title={`file-${dataQues?.ID_NHCH}`}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFullscreen} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Question;
