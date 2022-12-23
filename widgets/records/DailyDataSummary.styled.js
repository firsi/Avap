import styled from "styled-components";

const DetailComp = ({label, value}) => {
    return <div><span>{label}</span>:&nbsp;<span>{value}</span></div> 
 }

 const Detail = styled(DetailComp)`
    /* & span { */
    background: blue;
        font-weight: 700;
        font-size: 12px;
        color: #56a8cf;
    /* } */
 `


const DailyDataSummary = styled.div`
.ant-table-wrapper .ant-table-thead >tr>th {
    color: rgb(21 69 134);
    background: #fff;
    font-size: 11px
}

.ant-table-wrapper .ant-table-tbody {
    & >tr >td:last-child {
    padding-left: 0;
    svg {
        width: 14px;
        fill: #164587;
    }
    }

    .ant-table-row:nth-child(7n + 1) > td{
        background: #cee2ec38;
    }

    & >tr.ant-table-row-selected >td.ant-table-cell {
    /* background: #bbc2c7; */
    background: #c2e3f3;
}
}

.ant-table-expanded-row.ant-table-expanded-row-level-1 {
    .ant-table-cell > div {
        margin-left: 16px;
        span {
            font-size: 12px;
        }
         & span:first-child {
        font-weight: 700;
        /* color: #56a8cf; */
    }
    }
}
`;

export  {DailyDataSummary, Detail};

