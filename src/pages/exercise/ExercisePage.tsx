import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { Box, Grid, Container, FormControlLabel, Button, Checkbox, Typography, CircularProgress } from '@mui/material';
import { Sidebar, QuestionPanel, QuestionNavigation, QuestionHeader } from 'src/sections/exercises';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

export default function ExercisePage() {

    const { name } = useParams();

    const location = useLocation()
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const infoQues = useMemo(() => location.state?.exam, [location.state.exam]);
    const infoHocvien = useMemo(() => location.state?.hocvien, [location.state.hocvien]);

    useEffect(() => {
        if (!location.state || !location.state.exam || !location.state.hocvien) {
            alert("Không có dữ liệu hợp lệ, chuyển về trang chủ!");
            navigate("/", { replace: true });
        }
    }, [location, navigate]);

    const [currentQuestion, setCurrentQuestion] = useState<any>();
    const [typeExam, setTypeExam] = useState<any>();
    const [currentExam, setCurrentExam] = useState<any>();
    console.log('currentExam', currentExam)
    const [answers, setAnswers] = useState<Record<string, string | { fileData: string; fileName: string; isFile: boolean }>>({});


    const [loadingPage, setLoadingPage] = useState(true);
    const [startExercise, setStartExercise] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [doneExam, setDoneExam] = useState<string>("")

    useEffect(() => {
        // Khi danh sách câu hỏi thay đổi, đặt câu hỏi đầu tiên làm mặc định
        if (questions.length > 0 && !currentQuestion) {
            const firstPhan = questions[0]; // Lấy phần đầu tiên
            const firstQuestion = firstPhan.ds_cauhoi[0]; // Lấy câu hỏi đầu tiên trong phần đầu tiên

            if (firstQuestion) {
                setCurrentQuestion({
                    question: firstQuestion,
                    phan: {
                        ID_Baithi_Phan: firstPhan.ID_Baithi_Phan,
                        Tenphan: firstPhan.Tenphan,
                    },
                });
            }
        }
    }, [questions, currentQuestion]); // Chạy khi questions thay đổi

    // Hàm xử lý cập nhật câu trả lời
    const handleAnswerChange = useCallback(
        (questionId: number, answer: any, isChecked?: boolean, type?: string) => {
            setAnswers((prevAnswers: any) => {
                let updatedAnswers;
                const currentAnswers = prevAnswers[questionId] || [];

                if (type === "TN2") {
                    updatedAnswers = isChecked
                        ? [...currentAnswers, answer]
                        : currentAnswers.filter((item: string) => item !== answer);
                } else if (type === "CHGN") {
                    updatedAnswers = { ...prevAnswers[questionId], ...answer };
                } else {
                    updatedAnswers = answer;
                }

                return { ...prevAnswers, [questionId]: updatedAnswers };
            });
        },
        []
    );
    const [files, setFiles] = useState<Record<string, { fileData: string; fileName: string }>>({});

    // Hàm nhận files từ Question
    const handleFileUpdate = (questionId: string, fileData: { fileData: string; fileName: string }) => {
        setFiles(prevFiles => ({ ...prevFiles, [questionId]: fileData }));
    };

    const handleSubmitExam = async () => {
        setLoading(true);
        try {
            const encodedAnswers: Record<string, any> = { ...answers };

            if (`${typeExam}` === '3') {
                for (const questionId in answers) {
                    const answerValue = answers[questionId];

                    if (typeof answerValue === "string" && answerValue.startsWith("data:")) {
                        encodedAnswers[questionId] = {
                            fileData: answerValue,
                            fileName: files[questionId]?.fileName || `file_${questionId}.pdf`,
                            isFile: true,
                        };
                    } else if (typeof answerValue === "object" && answerValue !== null && "fileData" in answerValue) {
                        encodedAnswers[questionId] = answerValue;
                    }
                }
            }

            await axios.post(`/api/v1/baithi/submit/${currentExam?.ID_Baithi_HV}`, {
                typeExam,
                answers: encodedAnswers
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setDoneExam("Bạn đã nộp bài thi thành công!");
            setStartExercise(false);

            // 🛠 Chờ xoá hoàn tất
            await Promise.all([
                localStorage.removeItem('examStartTime'),
                localStorage.removeItem('examAnswers'),
                localStorage.removeItem('examQuestions')
            ]);

            setLoading(false);

            // Hiển thị thông báo và quay lại trang trước đó
            alert("Bạn đã nộp bài thi thành công!");
            window.history.back();

        } catch (err) {
            console.error('Error submitting exam:', err);
            setLoading(false);
        }
    };


    useEffect(() => {
        const initiateExam = async () => {
            try {
                setLoadingPage(true); // Bắt đầu loading

                // Lấy địa chỉ IP + vị trí
                // const ipResponse = await axios.get("https://ipinfo.io/json");
                // const ipAddress = ipResponse.data.ip;
                // const location = `${ipResponse.data.city}, ${ipResponse.data.country}`;

                // Gửi request bắt đầu bài thi
                const response = await axios.post('api/v1/baithi/start', {
                    ID_Baithi: infoQues?.ID_Baithi,
                    Thoigianbd: new Date(),
                    ID_Hocvien: infoHocvien?.ID_Hocvien,
                    Thoigianthi: infoQues?.Thoigianthi,
                    // DiachiIP: ipAddress,
                    // Vitri: location
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const responseData = response.data?.data;

                if (responseData) {
                    const { Thoigianconlai, isCheck, Thoigianthi, data } = responseData;
                    console.log('responseData', responseData)

                    if (isCheck === "COUNTINUE") {
                        console.log("Tiếp tục bài thi...");
                        setCurrentExam(data)
                        setStartExercise(true);
                        setTimeLeft(((Thoigianconlai || Thoigianthi) * 60) || 3600);
                        // Lấy câu hỏi từ localStorage trước khi gọi API
                        const savedQuestions = getQuestionsFromLocalStorage();

                        if (savedQuestions.length > 0) {
                            setQuestions(savedQuestions);

                        } else {
                            await fetchExamQuestions(infoQues?.ID_Baithi);
                        }

                        // Lấy đáp án từ localStorage
                        const savedAnswers = getAnswersFromLocalStorage();
                        if (savedAnswers) {
                            setAnswers(savedAnswers);
                        }

                    } else if (isCheck === "START") {
                        console.log("Bắt đầu bài thi mới...");
                        setCurrentExam(data)
                        setStartExercise(true);
                        setTimeLeft(((Thoigianconlai || Thoigianthi) * 60) || 3600);
                        // Gọi API lấy câu hỏi bài thi mới
                        await fetchExamQuestions(infoQues?.ID_Baithi);

                        // Xóa đáp án cũ khi bắt đầu bài thi mới
                        localStorage.removeItem('examAnswers');
                    }
                } else {
                    // alert("Lỗi khi khởi động bài thi. Hãy thử lại.");
                    setDoneExam("Đã hoàn thành bài thi!")
                }

            } catch (error) {
                console.error("Error starting exam:", error);
            } finally {
                setLoadingPage(false);
            }
        };

        if (infoQues && infoHocvien) {
            initiateExam();
        } else {
            alert("Không có dữ liệu hợp lệ, chuyển về trang chủ!");
            navigate("/", { replace: true });
        }
    }, [infoQues, infoHocvien, navigate]);


    const fetchExamQuestions = async (examId: string) => {
        try {
            const response = await axios.get(`/api/v1/baithi/detail/${examId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.data?.data?.baithiphan_list) {
                setQuestions(response.data.data?.baithiphan_list);
                setTypeExam(response.data.data?.dm_hinhthucthi?.ID_Hinhthucthi)

                // Lưu câu hỏi vào localStorage
                localStorage.setItem('examQuestions', JSON.stringify(response.data.questions));
            } else {
                alert("Không lấy được dữ liệu câu hỏi!");
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    // Hàm lưu đáp án vào localStorage
    const saveAnswersToLocalStorage = (answers: any) => {
        localStorage.setItem('examAnswers', JSON.stringify(answers));
    };

    useEffect(() => {
        const savedAnswers = getAnswersFromLocalStorage();
        if (savedAnswers && Object.keys(savedAnswers).length > 0) {
            setAnswers(savedAnswers);
        }
    }, []);


    // Hàm lấy đáp án từ localStorage
    const getAnswersFromLocalStorage = () => {
        const savedAnswers = localStorage.getItem('examAnswers');
        if (!savedAnswers) return null; // Nếu không có dữ liệu, trả về null thay vì []
        try {
            return JSON.parse(savedAnswers);
        } catch (error) {
            return null;
        }
    };


    // Hàm lấy câu hỏi từ localStorage
    const getQuestionsFromLocalStorage = () => {
        try {
            const savedQuestions = localStorage.getItem('examQuestions');
            if (!savedQuestions) return []; // Trả về mảng rỗng nếu không có dữ liệu
            return JSON.parse(savedQuestions);
        } catch (error) {
            return []; // Trả về mảng rỗng nếu lỗi xảy ra
        }
    };



    useEffect(() => {
        if (startExercise) {
            const savedQuestions = getQuestionsFromLocalStorage();
            if (savedQuestions) {
                setQuestions(savedQuestions);
            }
        }
    }, [startExercise]);


    // Lưu đáp án mỗi khi có thay đổi
    useEffect(() => {
        saveAnswersToLocalStorage(answers);
    }, [answers]);

    // Xử lý khi trang bị đóng đột ngột
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Lưu đáp án trước khi trang bị đóng
            saveAnswersToLocalStorage(answers);
            // Hiển thị thông báo xác nhận
            event.preventDefault();
            event.returnValue = ''; // Yêu cầu trình duyệt hiển thị thông báo
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [answers]);

    if (loadingPage) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`PMC Knowledge | ${name}`} </title>
            </Helmet>

            <Container sx={{ mt: 3, display: "flex" }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    {/* Sidebar - Cố định bên trái */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        lg={3}
                        sx={{
                            position: {
                                md: "sticky",
                                xs: "none"
                            },
                            top: 0,
                            overflowY: "auto", // Giữ sidebar cố định
                        }}
                    >
                        <Sidebar
                            submit={loading}
                            loading={loadingPage}
                            startExercise={startExercise}
                            setStartExercise={setStartExercise}
                            handleSubmitExam={handleSubmitExam}
                            infoQues={infoQues}
                            timeLeft={timeLeft} // Truyền thời gian còn lại xuống Sidebar
                        />
                    </Grid>

                    {/* Nội dung chính - Không còn height: 100vh để responsive tốt hơn */}
                    <Grid
                        item
                        xs={12}
                        md={9}
                        lg={9}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            overflowY: "auto", // Cho phép cuộn nội dung
                        }}
                    >
                        {startExercise ? (
                            <>
                                {/* Ẩn QuestionHeader trên màn hình nhỏ */}
                                <Box
                                    sx={{
                                        paddingBottom: "16px",
                                        display: { xs: "none", md: "block" }, // Ẩn trên mobile
                                    }}
                                >
                                    <QuestionHeader />
                                </Box>

                                <QuestionPanel
                                    handleAnswerChange={handleAnswerChange}
                                    answers={answers}
                                    setAnswers={setAnswers}
                                    currentQuestion={currentQuestion}
                                    typeExam={typeExam}
                                    onFileChange={handleFileUpdate}
                                />

                                <QuestionNavigation
                                    answers={answers}
                                    questions={questions}
                                    infoQues={infoQues}
                                    currentQuestion={currentQuestion}
                                    setCurrentQuestion={setCurrentQuestion}
                                />
                            </>
                        ) : (

                            <Typography variant="h6" align="center">
                                {doneExam ? doneExam : `Nhấn "Bắt đầu làm bài" để hiển thị câu hỏi.`}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Container>

        </>
    );
}
