import styled from "styled-components";
import {Card} from "antd"

const SummaryCard = styled(Card)`
    background: #c2e3f3;
.ant-card-body {
    .ant-typography {
        color: rgb(100 103 120);
        font-size: 12px;
    }

   .description {
    color: #164587;
   }
}
`;

export default SummaryCard;