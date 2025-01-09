import { m } from 'framer-motion';
import { useRef } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography, IconButton } from '@mui/material';
// _mock_
import { _carouselsMembers, _socials } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Carousel, { CarouselArrows } from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef<Carousel>(null);

  const theme = useTheme();

  const carouselSettings = {
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="p" variant="overline" sx={{ color: 'text.bold' }}>
          Giảng viên tiêu biểu
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Phan Thanh Sơn
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 800,
            color: 'text.secondary',
          }}
        >
          Là chuyên gia đi đầu về ứng dụng phần mềm trong quản trị tài chính kế toán,
          Ông đã nhiều năm kinh nghiệm thực tế về tư vấn cho các Ban quản trị,
          Chủ đầu tư nhà chung cư về phân tích tài chính, quản trị dòng tiền,
          từ đó giúp giảm thiểu các rủi ro về chi phí.
          Các khóa học chuyên sâu được ông thiết kế nhằm tập trung về các kiến thức và kỹ năng thiết yếu trong công tác kế toán tổng hợp và quản lý công nợ dự án,
          là sự chuẩn bị để hoàn thiện các bút toán tổng hợp,
          hoàn tất hạch toán các phần hành để lên Báo cáo tài chính theo đúng các chuẩn mực và quy định hiện hành.
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          filled
          shape="rounded"
          onNext={handleNext}
          onPrevious={handlePrev}
          leftButtonProps={{
            sx: {
              left: 24,
              ...(_carouselsMembers.length < 5 && { display: 'none' }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: 24,
              ...(_carouselsMembers.length < 5 && { display: 'none' }),
            },
          }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {_carouselsMembers.map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade().in}
                sx={{ px: 1.5, py: 10 }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>

      <Button
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={<Iconify icon="ic:round-arrow-right-alt" width={24} />}
        sx={{ mx: 'auto' }}
      >
        Xem tất cả khóa học
      </Button>
    </Container>
  );
}

// ----------------------------------------------------------------------

type MemberCardProps = {
  member: {
    name: string;
    role: string | undefined;
    avatar: string;
  };
};

function MemberCard({ member }: MemberCardProps) {
  const { name, role, avatar } = member;
  return (
    <Card key={name}>
      {/* <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography> */}

      <Box sx={{ px: 1 }}>
        <Image alt={name} src={avatar} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      {/* <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}
    </Card>
  );
}
