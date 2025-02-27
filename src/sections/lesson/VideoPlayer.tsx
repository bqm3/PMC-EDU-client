import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video, onVideoWatched }: any) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [watched, setWatched] = useState(false);
    const [startTime, setStartTime] = useState(""); // Thời gian bắt đầu
    const [endTime, setEndTime] = useState(""); // Thời gian kết thúc
    const [elapsedTime, setElapsedTime] = useState(0); // Tổng thời gian xem

    // Reset state khi video thay đổi
    useEffect(() => {
        setWatched(false);
        setStartTime("");
        setEndTime("");
        setElapsedTime(0);
    }, [video]);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleProgress = ({ playedSeconds }: any) => {
        if (playerRef.current) {
            const duration = playerRef.current.getDuration();
            const watchThreshold = duration * (video?.Time / 100 || 10 / 100); // Phần trăm thời gian cần xem

            if (!watched && playedSeconds >= watchThreshold) {
                const now = new Date();
                const endTimeStr = formatDate(now);
                const elapsed = Math.round(playedSeconds);

                setWatched(true);
                setEndTime(endTimeStr);
                setElapsedTime(elapsed);

                onVideoWatched(video.ID_Video, startTime, endTimeStr, elapsed);
            }
        }
    };

    const handlePlay = () => {
        const now = new Date();
        setStartTime(formatDate(now));
    };

    return (
        <Box
            sx={{
                width: '95%',
                height: { xs: 200, sm: 400, md: 600 },
            }}
        >
            <ReactPlayer
                width="100%"
                height="100%"
                ref={playerRef}
                url={video?.urlVideo}
                controls
                playing={false}
                onPlay={handlePlay}
                onProgress={handleProgress}
            />
        </Box>
    );
};

export default VideoPlayer;
