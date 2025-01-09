import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getProduct, addToCart, gotoStep } from '../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// @types
import { ICheckoutCartItem } from '../@types/product';
// components
import Iconify from '../components/iconify';
import Markdown from '../components/markdown';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
import { SkeletonProductDetails } from '../components/skeleton';
// sections
import {
  CourseDetailsSummary,
  CourseDetailsReview,
  CourseDetailsCarousel,
  CourseDetailsAdd
} from '../sections/courses/details';
import CartWidget from '../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const dispatch = useDispatch();

  const { product, isLoading, checkout } = useSelector((state) => state.product);

  const [currentTab, setCurrentTab] = useState('description');

  useEffect(() => {
    if (name) {
      dispatch(getProduct(name as string));
    }
  }, [dispatch, name]);

  const handleAddCart = (newProduct: ICheckoutCartItem) => {
    dispatch(addToCart(newProduct));
  };

  const handleGotoStep = (step: number) => {
    dispatch(gotoStep(step));
  };

  const TABS = [
    {
      value: 'description',
      label: 'Giới thiệu nội dung',
      component: product ? <Markdown children={product?.description} /> : null,
    },
    {
      value: 'courses',
      label: `Bài học (${product ? product.reviews.length : ''})`,
      component: product ? <CourseDetailsReview product={product} /> : null,
    },
    {
      value: 'reviews',
      label: `Đánh giá (${product ? product.reviews.length : ''})`,
      component: product ? <CourseDetailsReview product={product} /> : null,
    },
    {
      value: 'teacher',
      label: 'Giảng viên',
      component: product ? <Markdown children={product?.description} /> : null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`Ecommerce: ${product?.name || ''} | Minimal UI`}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ marginY: 10 }}>

        {product && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={8}>
                <CourseDetailsSummary
                  product={product}
                  cart={checkout.cart}
                  onAddCart={handleAddCart}
                  onGotoStep={handleGotoStep}
                />
                <Box marginTop={5}>
                  <Stack >
                    <Typography variant="h6">Nội dung khóa học</Typography>
                    <Stack sx={{ gap: 1, mt: 1, flexDirection: 'row', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                      <Stack sx={{ gap: 0.5, flexDirection: 'row', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Typography variant="subtitle1"> 4 </Typography>
                        <Typography variant="subtitle2"> chương</Typography>
                      </Stack>
                      <Stack sx={{ gap: 0.5, flexDirection: 'row', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Typography variant="subtitle1"> 12 </Typography>
                        <Typography variant="subtitle2"> bài học</Typography>
                      </Stack>
                      <Stack sx={{ gap: 0.5, flexDirection: 'row', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Typography variant="subtitle1"> Thời lượng </Typography>
                        <Typography variant="subtitle2"> 03 giờ 26 phút</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <CourseDetailsReview product={product} />
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <CourseDetailsAdd
                  product={product}
                  cart={checkout.cart}
                  onAddCart={handleAddCart}
                  onGotoStep={handleGotoStep}
                />
              </Grid>
            </Grid>


            {/* <Box
              marginTop={5}>

              <Card>
                <Tabs
                  value={currentTab}
                  onChange={(event, newValue) => setCurrentTab(newValue)}
                  sx={{ px: 3, bgcolor: 'background.neutral' }}
                >
                  {TABS.map((tab) => (
                    <Tab key={tab.value} value={tab.value} label={tab.label} />
                  ))}
                </Tabs>

                <Divider />

                {TABS.map(
                  (tab) =>
                    tab.value === currentTab && (
                      <Box
                        key={tab.value}
                        sx={{
                          ...(currentTab === 'description' && {
                            p: 3,
                          }),
                        }}
                      >
                        {tab.component}
                      </Box>
                    )
                )}
              </Card>

            </Box> */}
          </>
        )}

        {isLoading && <SkeletonProductDetails />}
      </Container >
    </>
  );
}
