import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video, onVideoWatched }: any) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [watched, setWatched] = useState(false);
    const [startTime, setStartTime] = useState(""); // Thời gian bắt đầu
    const [endTime, setEndTime] = useState(""); // Thời gian kết thúc
    const [elapsedTime, setElapsedTime] = useState(0); // Tổng thời gian xem
    const [lastPlayed, setLastPlayed] = useState(0); // Kiểm tra tua
    const [isPlaying, setIsPlaying] = useState(false); // Kiểm soát trạng thái phát video

    // Reset state khi video thay đổi
    useEffect(() => {
        setWatched(false);
        setStartTime("");
        setEndTime("");
        setElapsedTime(0);
        setLastPlayed(0);
        setIsPlaying(false);

        if (playerRef.current) {
            setTimeout(() => {
                playerRef.current?.seekTo(0, "seconds"); // Reset về 0s
            }, 100);
        }
    }, [video]);

    // Hàm format thời gian
    const formatDate = (date: Date) => date.toISOString().replace("T", " ").split(".")[0];

    // Xử lý khi video chạy
    const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
        if (playerRef.current) {
            const duration = playerRef.current.getDuration();
            const watchThreshold = duration * (Number(video.Time) / 100);
            // Nếu học viên tua video, cảnh báo và reset trạng thái
            if (playedSeconds < lastPlayed) {
                alert("Không được tua video! Vui lòng reload lại trang để tiếp tục học.");
                setWatched(false);
                setElapsedTime(0);
                setLastPlayed(0);
                playerRef.current.seekTo(0, "seconds"); // Đưa video về lại 0s
                setIsPlaying(false);
                return;
            }

            // Cập nhật vị trí xem cuối cùng
            setLastPlayed(playedSeconds);

            // Nếu học viên xem đủ thời gian yêu cầu
            if (!watched && playedSeconds >= watchThreshold) {
                const now = new Date();
                const endTimeStr = formatDate(now);
                const elapsed = Math.round(playedSeconds);

                setWatched(true);
                setEndTime(endTimeStr);
                setElapsedTime(elapsed);

                // Gửi dữ liệu điểm danh
                onVideoWatched(video.ID_Lophoc, video.ID_Lichhoc, startTime || endTimeStr, endTimeStr, elapsed);
            }
        }
    };

    // Khi video bắt đầu chơi
    const handlePlay = () => {
        if (!startTime) {
            const now = new Date();
            setStartTime(formatDate(now));
        }
        setIsPlaying(true);
    };

    // Khi video tạm dừng
    const handlePause = () => {
        setIsPlaying(false);
    };

    // Tạm dừng video khi rời khỏi trang
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPlaying(false); // Dừng video khi rời tab
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <Box
            sx={{
                width: "95%",
                height: { xs: 200, sm: 400, md: 600 },
            }}
        >
            <ReactPlayer
                key={video?.ID_Lichhoc} // Reset ReactPlayer khi đổi video
                width="100%"
                height="100%"
                ref={playerRef}
                url={video?.urlVideo}
                controls
                playing={isPlaying}
                config={{
                    file: {
                        attributes: {
                            disableRemotePlayback: true, // Tắt lưu cache trình duyệt
                        },
                    },
                }}
                onPlay={handlePlay}
                onPause={handlePause}
                onProgress={handleProgress}
            />
        </Box>
    );
};

export default VideoPlayer;
