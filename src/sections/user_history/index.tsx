import { Box, Grid } from '@mui/material';
import React from 'react'
import { IBaithiHocVienChiTiet } from 'src/@types/course'
import QuestionPanel from './QuestionManager';

type Props = {
    currentBaiThiHocVien: IBaithiHocVienChiTiet[];
}

export default function QuestionManager({ currentBaiThiHocVien }: Props) {

    return (
        <QuestionPanel
            handleAnswerChange={() => { }}
            currentBaiThiHocVien={currentBaiThiHocVien}
        />
    )
}
