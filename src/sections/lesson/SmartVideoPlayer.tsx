import React from 'react';
import ReactPlayer from 'react-player';

interface SmartVideoPlayerProps {
    video: {
        ID_Lichhoc?: string | number;
        ID_Lophoc?: string | number;
        urlVideo: string;
        Time?: number;
    };
    isPlaying?: boolean;
    playerRef?: React.RefObject<ReactPlayer>;
    onPlay?: () => void;
    onPause?: () => void;
    onProgress?: (state: any) => void;
    config?: any;
    onWatchedExternal?: (start: string, end: string) => void; // ✅ thêm mới
}


const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({
    video,
    isPlaying = false,
    playerRef,
    onPlay,
    onPause,
    onProgress,
    onWatchedExternal
}) => {
    const url = video?.urlVideo || '';

    const isYouTubeUrl = (url: string) =>
        /youtube\.com|youtu\.be/.test(url);

    const isSharePointStreamPage = (url: string) =>
        url.includes('sharepoint.com') && url.includes('stream.aspx');



    if (!url) return <div ><p style={{ color: 'white' }}>⏳ Đang tải video... </p></div>;

    if (isYouTubeUrl(url)) {
        return (
            <ReactPlayer
                key={video?.ID_Lichhoc}
                ref={playerRef}
                url={url}
                controls
                playing={isPlaying}
                width="100%"
                height="100%"
                config={{
                    file: {
                        attributes: {
                            disableRemotePlayback: true,
                        },
                    },
                }}
                onPlay={onPlay}
                onPause={onPause}
                onProgress={onProgress}
            />
        );
    }

    if (isSharePointStreamPage(url)) {
        return (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
                <p style={{ color: 'white' }}>🔒 Video này không thể hiển thị trực tiếp do hạn chế bảo mật, vui lòng ấn vào nút để xem video bài giảng.</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        const now = new Date();
                        const timeStr = now.toISOString().replace('T', ' ').split('.')[0];
                        onWatchedExternal?.(timeStr, timeStr); // ✅ Gọi callback khi mở tab
                    }}
                    style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#0078d4',
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    👉 Mở video trong tab mới
                </a>
            </div>
        );
    }


    return <div style={{ color: 'red' }}>❌ Không hỗ trợ định dạng video này.</div>;
};

export default SmartVideoPlayer;
