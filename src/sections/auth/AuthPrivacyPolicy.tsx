import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from '@mui/material';

export default function AuthPrivacyPolicy() {
    const [open, setOpen] = useState(false);
    const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClosePrivacyPolicy = () => setOpenPrivacyPolicy(false);
    const handleOpenPrivacyPolicy = () => setOpenPrivacyPolicy(true);

    return (
        <div>

            {/* Link mở điều khoản dịch vụ */}
            <Stack direction="row" justifyContent="center" spacing={0.6} pt={3}>
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        // color: 'darkblue',
                    }}
                    onClick={handleOpen}
                >
                    Điều khoản dịch vụ
                </Typography>
                <Typography variant="body2">và</Typography>
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        // color: 'darkblue',
                    }}
                    onClick={handleOpenPrivacyPolicy}
                >
                    Chính sách bảo mật
                </Typography>
            </Stack>

            {/* Dialog hiển thị nội dung chi tiết */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Điều khoản dịch vụ
                </DialogTitle>
                <DialogContent dividers sx={{ maxHeight: '70vh', overflowY: 'auto' }}>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        1. Nguyên tắc chung
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Trước khi đăng ký tài khoản để sử dụng dịch vụ trên PMC, bạn xác nhận đã đọc, hiểu và đồng ý với tất cả các quy định trong Thỏa Thuận Cung Cấp Và Sử Dụng Dịch Vụ PMC này.
                        Khi đăng ký tài khoản và sử dụng dịch vụ, bạn chấp nhận rằng mọi thông tin chia sẻ thuộc trách nhiệm của bạn và phải tuân thủ các quy định pháp luật.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        2. Quy định về đặt tên tài khoản
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Không được đặt tên trùng hoặc gây nhầm lẫn với các tổ chức chính trị, nhà nước.<br />
                        - Không sử dụng tên vi phạm quyền sở hữu trí tuệ.<br />
                        - Tài khoản vi phạm quy định về đặt tên có thể bị khoá hoặc xóa vĩnh viễn.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        3. Quy định về hình đại diện
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Không sử dụng hình ảnh có nội dung vi phạm pháp luật, kích động bạo lực, hoặc xúc phạm cá nhân/tổ chức.<br />
                        - Không sử dụng hình ảnh giả mạo nhằm lừa đảo hoặc xâm phạm quyền lợi người khác.<br />
                        - Tài khoản vi phạm có thể bị khoá hoặc xóa vĩnh viễn.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        4. Các thông tin cấm chia sẻ trên PMC
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Chống lại Nhà nước Việt Nam, tuyên truyền khủng bố.<br />
                        - Kích động bạo lực, đồi trụy, xuyên tạc lịch sử, gây mất đoàn kết dân tộc.<br />
                        - Vi phạm quyền sở hữu trí tuệ hoặc giả mạo tổ chức, cá nhân khác.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        5. Các hành vi bị cấm
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Sử dụng chương trình gian lận, phần mềm độc hại.<br />
                        - Quấy rối, chửi bới, làm phiền người dùng khác.<br />
                        - Quảng bá sản phẩm/dịch vụ không được PMC chấp thuận.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        6. Quyền của người sử dụng PMC
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Thay đổi thông tin cá nhân, mật khẩu.<br />
                        - Được bảo đảm bí mật thông tin cá nhân.<br />
                        - Yêu cầu PMC cung cấp thông tin cần thiết liên quan đến tài khoản.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        7. Quyền của PMC
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - PMC có quyền xóa tài khoản vi phạm mà không cần thông báo trước.<br />
                        - Chặn tài khoản vi phạm điều khoản hoặc gây ảnh hưởng tiêu cực đến hệ thống.<br />
                        - Cung cấp thông tin người dùng cho cơ quan có thẩm quyền nếu có yêu cầu hợp pháp.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        8. Trách nhiệm của PMC
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Hỗ trợ người dùng trong quá trình sử dụng dịch vụ.<br />
                        - Giải quyết tranh chấp trong phạm vi quy định của pháp luật Việt Nam.<br />
                        - Bảo mật thông tin cá nhân của người dùng theo chính sách bảo mật.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        9. Cơ chế xử lý vi phạm
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - PMC có quyền khóa tài khoản vi phạm vĩnh viễn hoặc tạm thời.<br />
                        - Trường hợp vi phạm chưa được quy định, PMC có quyền quyết định mức xử phạt phù hợp.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        10. Cảnh báo về rủi ro lưu trữ và chia sẻ thông tin
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Người dùng chịu trách nhiệm về thông tin được chia sẻ với bên thứ ba.<br />
                        - PMC không chịu trách nhiệm về mất mát dữ liệu do lỗi kỹ thuật hoặc bất khả kháng.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        11. Loại trừ nghĩa vụ và bồi thường
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Người dùng chịu trách nhiệm về vi phạm của mình khi sử dụng dịch vụ.<br />
                        - Người dùng phải bồi thường thiệt hại nếu gây ảnh hưởng đến PMC hoặc bên thứ ba.
                    </Typography>

                </DialogContent>

                {/* Nút đóng */}
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPrivacyPolicy} onClose={handleClosePrivacyPolicy} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Chính sách bảo mật
                </DialogTitle>
                <DialogContent dividers sx={{ maxHeight: '70vh', overflowY: 'auto' }}>

                    {/* Điều khoản dịch vụ */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Điều khoản dịch vụ
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Trước khi đăng ký tài khoản để sử dụng dịch vụ trên PMC, bạn xác nhận đã đọc, hiểu và đồng ý với tất cả các quy định trong Thỏa Thuận Cung Cấp Và Sử Dụng Dịch Vụ PMC này.
                    </Typography>

                    {/* Chính sách bảo mật */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Chính sách bảo mật
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        1. Chúng tôi là ai?
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Trang web của chúng tôi là: https://pmcweb.vn/
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        2. Bình luận
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Khi khách truy cập để lại bình luận trên trang web, chúng tôi thu thập dữ liệu hiển thị trong biểu mẫu bình luận, địa chỉ IP của khách truy cập và chuỗi User-Agent trình duyệt để giúp phát hiện spam.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        3. Phương tiện
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Nếu bạn tải lên hình ảnh lên trang web, bạn nên tránh tải lên hình ảnh có dữ liệu vị trí được nhúng (EXIF GPS). Khách truy cập có thể tải xuống và trích xuất bất kỳ dữ liệu vị trí nào từ hình ảnh trên trang web.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        4. Cookie
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Nếu bạn để lại bình luận, bạn có thể chọn lưu tên, email và trang web của mình trong cookie. Cookie này giúp bạn không phải điền lại thông tin khi để lại bình luận khác. Các cookie này sẽ tồn tại trong 1 năm.<br />
                        - Nếu bạn truy cập trang đăng nhập, chúng tôi sẽ thiết lập một cookie tạm thời để kiểm tra xem trình duyệt của bạn có chấp nhận cookie hay không.<br />
                        - Khi bạn đăng nhập, chúng tôi sẽ thiết lập một số cookie để lưu thông tin đăng nhập và tùy chọn hiển thị của bạn. Cookie đăng nhập tồn tại trong 2 ngày, cookie tùy chọn hiển thị tồn tại trong 1 năm.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        5. Nội dung nhúng từ các trang web khác
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Các bài viết trên trang web này có thể bao gồm nội dung nhúng (ví dụ: video, hình ảnh, bài viết, v.v.). Nội dung nhúng từ các trang web khác hoạt động giống như khi bạn truy cập trực tiếp trang web đó.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        6. Chúng tôi chia sẻ dữ liệu của bạn với ai?
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Nếu bạn yêu cầu đặt lại mật khẩu, địa chỉ IP của bạn sẽ được đưa vào email đặt lại.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        7. Chúng tôi lưu trữ dữ liệu của bạn trong bao lâu?
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Nếu bạn để lại bình luận, bình luận và siêu dữ liệu của nó sẽ được giữ lại vô thời hạn. Điều này giúp chúng tôi có thể tự động nhận dạng và phê duyệt các bình luận tiếp theo mà không cần giữ lại trong hàng đợi kiểm duyệt.<br />
                        - Đối với người dùng đăng ký trên trang web của chúng tôi (nếu có), chúng tôi cũng lưu trữ thông tin cá nhân mà họ cung cấp trong hồ sơ người dùng của họ. Tất cả người dùng có thể xem, chỉnh sửa hoặc xóa thông tin cá nhân của họ bất kỳ lúc nào (ngoại trừ việc thay đổi tên đăng nhập).
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        8. Bạn có quyền gì đối với dữ liệu của mình?
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Nếu bạn có tài khoản trên trang web này hoặc đã để lại bình luận, bạn có thể yêu cầu nhận tệp xuất dữ liệu cá nhân của bạn mà chúng tôi lưu giữ.<br />
                        - Bạn cũng có thể yêu cầu chúng tôi xóa bất kỳ dữ liệu cá nhân nào mà chúng tôi lưu giữ về bạn. Điều này không bao gồm bất kỳ dữ liệu nào mà chúng tôi có nghĩa vụ lưu giữ vì mục đích hành chính, pháp lý hoặc bảo mật.
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                        9. Dữ liệu của bạn được gửi đến đâu?
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Các bình luận của khách truy cập có thể được kiểm tra thông qua dịch vụ phát hiện spam tự động.
                    </Typography>

                </DialogContent>

                {/* Nút đóng */}
                <DialogActions>
                    <Button onClick={handleClosePrivacyPolicy} variant="contained" color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
